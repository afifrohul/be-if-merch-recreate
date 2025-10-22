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
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    product_id: z.string().min(1, 'Product is required.'),
    name: z
        .string()
        .min(1, 'Variant Name must be at least 1 character.')
        .max(50, 'Variant Name must be at most 50 characters.'),
    sku: z
        .string()
        .min(1, 'SKU must be at least 1 character.')
        .max(50, 'SKU must be at most 50 characters.'),
    price: z.coerce.number().min(0, 'Price must be at least 0.'),
    stock: z.coerce.number().min(0, 'Stock must be at least 0.'),
});

export type ProductVariantFormValues = z.infer<typeof formSchema>;

type Product = {
    id: string;
    name: string;
};

interface ProductVariantFormProps {
    initialData?: ProductVariantFormValues & { id?: number };
    product: Product[];
    submitUrl: string;
    method?: 'post' | 'put';
}

export function ProductVariantForm({
    product,
    initialData,
    submitUrl,
    method = 'post',
}: ProductVariantFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resolver = zodResolver(
        formSchema,
    ) as Resolver<ProductVariantFormValues>;

    const form = useForm<ProductVariantFormValues>({
        resolver,
        defaultValues: initialData
            ? {
                  ...initialData,
                  product_id: String(initialData.product_id),
              }
            : {
                  product_id: '',
                  name: '',
                  sku: '',
                  price: 0,
                  stock: 0,
              },
    });

    const onSubmit: SubmitHandler<ProductVariantFormValues> = (data) => {
        setIsSubmitting(true);

        router[method](
            submitUrl,
            {
                ...data,
                product_id: Number(data.product_id),
            },
            {
                onSuccess: () => setIsSubmitting(false),
                onError: () => setIsSubmitting(false),
            },
        );
    };

    return (
        <form id="product-variant-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldGroup>
                    {/* Product Selector */}
                    <Controller
                        name="product_id"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="product">
                                    Product
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
                                        <SelectValue placeholder="Select a product" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
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

                    {/* Variant Name */}
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    placeholder="Enter product variant name"
                                    autoComplete="off"
                                    required
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* SKU */}
                    <Controller
                        name="sku"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="sku">SKU</FieldLabel>
                                <Input
                                    {...field}
                                    id="sku"
                                    placeholder="Enter product variant SKU"
                                    autoComplete="off"
                                    required
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {/* Price & Stock */}
                <FieldGroup className="grid grid-cols-2 gap-4">
                    <Controller
                        name="price"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="price">
                                    Price (IDR)
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="price"
                                    placeholder="Enter product variant price"
                                    autoComplete="off"
                                    type="number"
                                    required
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="stock"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="stock">Stock</FieldLabel>
                                <Input
                                    {...field}
                                    id="stock"
                                    placeholder="Enter product variant stock"
                                    autoComplete="off"
                                    type="number"
                                    required
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </FieldGroup>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get('/product-variants')}
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
