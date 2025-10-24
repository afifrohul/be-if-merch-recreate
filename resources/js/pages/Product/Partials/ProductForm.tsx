import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from '@/components/ui/input-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const baseSchema = z.object({
    product_category_id: z.string(),
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters.')
        .max(100, 'Name must be at most 100 characters.'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters.')
        .max(500, 'Description must be at most 500 characters.'),
    status: z.string(),
});

const imageSchema = z.object({
    image: z
        .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
            message: 'Image is required',
        })
        .optional(),
});

const formSchema = z.object({
    ...baseSchema.shape,
    ...imageSchema.shape,
});

export type ProductFormValues = z.infer<typeof formSchema>;

type ProductCategory = {
    id: string;
    name: string;
};

interface ProductFormProps {
    initialData?: {
        id?: number;
        product_category_id?: string;
        name?: string;
        description?: string;
        status?: string;
        image?: string;
    };
    product_category: ProductCategory[];
    submitUrl: string;
    method?: 'post' | 'put';
}

export function ProductForm({
    product_category,
    initialData,
    submitUrl,
    method = 'post',
}: ProductFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_category_id: initialData?.product_category_id
                ? String(initialData.product_category_id)
                : '',
            name: initialData?.name,
            description: initialData?.description,
            status: initialData?.status,
            image: undefined as unknown as FileList,
        },
    });

    const onSubmit = (data: ProductFormValues) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('product_category_id', data.product_category_id);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('status', data.status);

        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }

        if (method === 'put') {
            formData.append('_method', 'PUT');
        }

        router.post(submitUrl, formData, {
            forceFormData: true,
            onSuccess: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false),
        });

    };

    return (
        <form id="faq-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="product_category_id"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="product-category">
                                Product Category
                            </FieldLabel>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="product-category"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    {product_category.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={String(category.id)}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                placeholder="Enter product name"
                                autoComplete="off"
                                required
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="image"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="image">
                                Image{' '}
                                {method === 'post' && (
                                    <span className="text-red-500">*</span>
                                )}
                            </FieldLabel>

                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => field.onChange(e.target.files)}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="description">
                                Description
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupTextarea
                                    {...field}
                                    id="description"
                                    rows={6}
                                    className="min-h-24 resize-none"
                                    placeholder="Provide a detailed description"
                                    required
                                />
                                <InputGroupAddon align="block-end">
                                    <InputGroupText className="tabular-nums">
                                        {field.value?.length}/500
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="status"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="status">Status</FieldLabel>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="status"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    <SelectItem value="released">
                                        Released
                                    </SelectItem>
                                    <SelectItem value="unreleased">
                                        Unreleased
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get('/products')}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Saving...'
                        : method === 'post'
                          ? 'Create'
                          : 'Update'}
                </Button>
            </div>
        </form>
    );
}
