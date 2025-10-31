import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { FaPlusCircle } from 'react-icons/fa';

type ProductVariant = {
    id: number;
    product_id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
};

interface ProductVariantIndexProps {
    productVariants: ProductVariant[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product Variants', href: '/product-variants' },
];

export default function ProductVariantIndex({
    productVariants,
}: ProductVariantIndexProps) {
    const columns: ColumnDef<ProductVariant>[] = [
        {
            accessorKey: 'product.name',
            header: 'Name Product',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'name',
            header: 'Name Product Variant',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'sku',
            header: 'SKU',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ row }) => {
                const priceIDR = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(row.original.price);
                return priceIDR;
            },
        },
        {
            accessorKey: 'stock',
            header: 'Stock',
            cell: (info) => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton
                        url={`/product-variants/${row.original.id}/edit`}
                    />
                    <DeleteButton
                        url={`/product-variants/${row.original.id}`}
                        confirmMessage="Are you sure to delete this Product?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Variant" />
            <div className="p-4">
                <div className="mx-auto flex w-full flex-col gap-4">
                    <DataTable<ProductVariant>
                        showIndexColumn
                        columns={columns}
                        data={productVariants}
                        createButton={
                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.get('/product-variants/create')
                                }
                            >
                                <FaPlusCircle className="mr-2" /> Create New
                                Product Variant
                            </Button>
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
