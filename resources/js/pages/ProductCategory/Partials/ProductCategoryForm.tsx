import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters.')
        .max(12, 'Name must be at most 12 characters.'),
});

export type ProductCategoryFormValues = z.infer<typeof formSchema>;

interface ProductCategoryFormProps {
    initialData?: ProductCategoryFormValues & { id?: number };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function ProductCategoryForm({
    initialData,
    submitUrl,
    method = 'post',
}: ProductCategoryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProductCategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            name: '',
        },
    });

    const onSubmit = (data: ProductCategoryFormValues) => {
        setIsSubmitting(true);

        router[method](submitUrl, data, {
            onSuccess: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <form id="product-category-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                placeholder="Enter product category name"
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

            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get('/product-categories')}
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
