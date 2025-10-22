import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ProductVariantForm,
    ProductVariantFormValues,
} from './Partials/ProductVariantForm';

type Product = {
    id: string;
    name: string;
};

interface EditProps {
    productVariant: ProductVariantFormValues & { id: number };
    products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product Variant - Edit', href: '/product-variants/edit' },
];

export default function Edit({ productVariant, products }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product Variant" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Edit Product Variant
                    </h1>
                    <Separator className="my-4" />
                    <ProductVariantForm
                        initialData={productVariant}
                        submitUrl={`/product-variants/${productVariant.id}`}
                        method="put"
                        product={products}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
