import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProductForm } from './Partials/ProductForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product - Create', href: '/products/create' },
];

type ProductCategory = {
    id: string;
    name: string;
};

interface CreateProps {
    productCategory: ProductCategory[];
}

export default function Create({ productCategory }: CreateProps) {
  console.log(productCategory)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Product</h1>
                    <Separator className="my-4" />
                    <ProductForm
                        submitUrl="/products"
                        method="post"
                        product_category={productCategory}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
