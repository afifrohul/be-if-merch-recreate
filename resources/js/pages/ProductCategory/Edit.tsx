import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ProductCategoryForm,
    ProductCategoryFormValues,
} from './Partials/ProductCategoryForm';

interface EditProps {
    productCategory: ProductCategoryFormValues & { id: number };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'FAQ - Edit', href: '/faqs/edit' },
];

export default function Edit({ productCategory }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product Category" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Edit Product Category
                    </h1>
                    <Separator className="my-4" />
                    <ProductCategoryForm
                        initialData={productCategory}
                        submitUrl={`/product-categories/${productCategory.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
