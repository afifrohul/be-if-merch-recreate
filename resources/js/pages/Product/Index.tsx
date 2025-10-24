import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { FaPlusCircle } from 'react-icons/fa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

type Product = {
    id: number;
    product_category_id: number;
    image: string;
    name: string;
    description: string;
    status: 'released' | 'unreleased';
};

interface ProductIndexProps {
    products: Product[];
}

export default function Index({ products }: ProductIndexProps) {
    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: 'image',
            header: 'Image',
            cell: ({ row }) => (
                <div>
                    <img
                        src={`/storage/${row.original.image}`}
                        alt={`${row.original.id}-image`}
                        className="h-16"
                    />
                </div>
            ),
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'category.name',
            header: 'Category',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <div
                    className={`w-fit rounded p-0.5 font-medium ${row.original.status === 'released' ? 'border border-green-500 bg-green-100 text-green-600' : 'border border-yellow-500 bg-yellow-100 text-yellow-600'}`}
                >
                    {row.original.status}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton url={`/products/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/products/${row.original.id}`}
                        confirmMessage="Are you sure to delete this Product?"
                    />
                </div>
            ),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="p-4">
                <div className="mx-auto flex w-full flex-col gap-4">
                    <DataTable<Product>
                        showIndexColumn
                        columns={columns}
                        data={products}
                        createButton={
                            <Button
                                variant="outline"
                                onClick={() => router.get('/products/create')}
                            >
                                <FaPlusCircle className="mr-2" /> Create New
                                Product
                            </Button>
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
