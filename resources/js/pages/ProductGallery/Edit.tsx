import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProductGalleryForm } from './Partials/ProductGalleryForm';

type Product = {
    id: string;
    name: string;
};

interface EditProps {
    productGallery: {
        id: number;
        product_id: string;
        image?: string;
    };
    product: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product - Edit', href: '/products/edit' },
];

export default function Edit({ product, productGallery }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Product</h1>
                    <Separator className="my-4" />
                    <ProductGalleryForm
                        initialData={productGallery}
                        submitUrl={`/product-galleries/${productGallery.id}`}
                        method="put"
                        product={product}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
