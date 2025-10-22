import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProductGalleryForm } from './Partials/ProductGalleryForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product Gallery - Create', href: '/product-galleries/create' },
];

type Product = {
    id: string;
    name: string;
};

interface CreateProps {
    product: Product[];
}

export default function Create({ product }: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product Gallery" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Product Gallery
                    </h1>
                    <Separator className="my-4" />
                    <ProductGalleryForm
                        submitUrl="/product-galleries"
                        method="post"
                        product={product}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
