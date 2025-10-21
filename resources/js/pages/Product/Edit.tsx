import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProductForm, ProductFormValues } from './Partials/ProductForm';

type ProductCategory = {
    id: string;
    name: string;
};

interface EditProps {
    product: ProductFormValues & { id: number };
    productCategory: ProductCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product - Edit', href: '/products/edit' },
];

export default function Edit({ product, productCategory }: EditProps) {
    console.log(product);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Product</h1>
                    <Separator className="my-4" />
                    <ProductForm
                        initialData={product}
                        submitUrl={`/products/${product.id}`}
                        method="put"
                        product_category={productCategory}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
