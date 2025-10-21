import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProductCategoryForm } from './Partials/ProductCategoryForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product Category - Create', href: '/product-categories/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product Category" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Product Category</h1>
                    <Separator className="my-4" />
                    <ProductCategoryForm submitUrl="/product-categories" method="post" />
                </div>
            </div>
        </AppLayout>
    );
}
