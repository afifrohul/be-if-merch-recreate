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
        title: 'Product Gallery',
        href: '/product-galleries',
    },
];

type ProductGallery = {
    id: number;
    product_id: number;
    image: string;
};

interface ProductGalleryIndexProps {
    productGallery: ProductGallery[];
}

export default function Index({ productGallery }: ProductGalleryIndexProps) {
    const columns: ColumnDef<ProductGallery>[] = [
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
            accessorKey: 'product.name',
            header: 'Product',
            cell: (info) => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton
                        url={`/product-galleries/${row.original.id}/edit`}
                    />
                    <DeleteButton
                        url={`/product-galleries/${row.original.id}`}
                        confirmMessage="Are you sure to delete this Product Gallery?"
                    />
                </div>
            ),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ" />
            <div className="p-4">
                <div className="mx-auto flex w-full flex-col gap-4">
                    <DataTable<ProductGallery>
                        showIndexColumn
                        columns={columns}
                        data={productGallery}
                        createButton={
                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.get('/product-galleries/create')
                                }
                            >
                                <FaPlusCircle className="mr-2" /> Create New
                                Product Gallery
                            </Button>
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
