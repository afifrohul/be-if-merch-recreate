import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
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
    product_id: z.string().nonempty('Product is required'),
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

export type ProductGalleryFormValues = z.infer<typeof formSchema>;

type Product = {
    id: string;
    name: string;
};

interface ProductGalleryFormProps {
    initialData?: { id?: number; product_id?: string; image?: string };
    product: Product[];
    submitUrl: string;
    method?: 'post' | 'put';
}

export function ProductGalleryForm({
    product,
    initialData,
    submitUrl,
    method = 'post',
}: ProductGalleryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProductGalleryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_id: initialData?.product_id
                ? String(initialData.product_id)
                : '',
            image: undefined as unknown as FileList,
        },
    });

    const onSubmit = (data: ProductGalleryFormValues) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('product_id', data.product_id);

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="product_id"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="product">Product</FieldLabel>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger id="product" className="w-full">
                                    <SelectValue placeholder="Select Product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {product.map((p) => (
                                        <SelectItem
                                            key={p.id}
                                            value={String(p.id)}
                                        >
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />

                {/* File Input */}
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
            </FieldGroup>

            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get('/product-galleries')}
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
