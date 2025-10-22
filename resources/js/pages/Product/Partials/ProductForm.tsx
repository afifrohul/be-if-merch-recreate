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

const formSchema = z.object({
    product_category_id: z.string(),
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters.')
        .max(100, 'Name must be at most 100 characters.'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters.')
        .max(500, 'Description must be at most 500 characters.'),
    status: z.enum(['released', 'unreleased']),
});

export type ProductFormValues = z.infer<typeof formSchema>;

type ProductCategory = {
    id: string;
    name: string;
};

interface ProductFormProps {
    initialData?: ProductFormValues & { id?: number };
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
        defaultValues: initialData
            ? {
                  ...initialData,
                  product_category_id: String(initialData.product_category_id),
              }
            : {
                  product_category_id: '',
                  name: '',
                  description: '',
                  status: 'unreleased',
              },
    });

    const onSubmit = (data: ProductFormValues) => {
        setIsSubmitting(true);

        router[method](
            submitUrl,
            { ...data, product_category_id: Number(data.product_category_id) },
            {
                onSuccess: () => {
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            },
        );
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
