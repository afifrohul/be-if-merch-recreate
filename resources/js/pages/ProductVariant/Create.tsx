import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ProductVariantForm } from './Partials/ProductVariantForm';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product Variants', href: '/product-variants' },
];

type Product = {
    id: string;
    name: string;
};

interface CreateProps {
    products: Product[];
}

export default function Create({ products }: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product Variant" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Product Variant
                    </h1>
                    <Separator className="my-4" />
                    <ProductVariantForm
                        submitUrl="/product-variants"
                        method="post"
                        product={products}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
