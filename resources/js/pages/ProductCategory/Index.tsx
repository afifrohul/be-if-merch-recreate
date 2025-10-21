import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { FaPlusCircle } from 'react-icons/fa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: '/faqs',
    },
];

type ProductCategory = {
    id: number;
    name: string;
    slug: string;
};

interface ProductCategoryIndexProps {
    productCategories: ProductCategory[];
}

export default function Index({
    productCategories,
}: ProductCategoryIndexProps) {
    const columns: ColumnDef<ProductCategory>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton
                        url={`/product-categories/${row.original.id}/edit`}
                    />
                    <DeleteButton
                        url={`/product-categories/${row.original.id}`}
                        confirmMessage="Are you sure to delete this product category?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Categories" />
            <div className="p-4">
                <div className="mx-auto flex w-full flex-col gap-4">
                    <DataTable<ProductCategory>
                        showIndexColumn
                        columns={columns}
                        data={productCategories}
                        createButton={
                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.get('/product-categories/create')
                                }
                            >
                                <FaPlusCircle className="mr-2" /> Create New
                                Product Category
                            </Button>
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
