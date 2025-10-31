import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { FiLoader } from 'react-icons/fi';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pending Transactions',
        href: '/pending-transactions',
    },
];

type User = {
    id: number;
    name: string;
};

type Item = {
    id: number;
    transaction_id: number;
    product_id?: number;
    product_variant_id?: number;
    product_name: string;
    varian_name?: string;
    sku?: string;
    price: number;
    quantity: number;
    subtotal: number;
    product_snapshot: string;
};

type Transaction = {
    id: number;
    user_id: number;
    invoice_number: string;
    total_amount: number;
    status: string;
    payment_status: string;
    created_at: string;
    user: User;
    items: Item[];
};

interface TransactionProps {
    transactions: Transaction[];
}

export default function Pending({ transactions }: TransactionProps) {
    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: 'user.name',
            header: 'Customer Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'invoice_number',
            header: 'Invoice Number',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'items',
            header: 'Number of Amount',
            cell: (info) => {
                const items = info.getValue() as Item[] | undefined;
                return items ? items.length : 0;
            },
        },
        {
            accessorKey: 'total_amount',
            header: 'Total Amount (Rp)',
            cell: (info) => {
                const total_amount = info.getValue() as number;
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(total_amount);
            },
        },
        {
            accessorKey: 'payment_status',
            header: 'Payment Status',
            cell: ({ row }) => (
                <div className="w-fit rounded border border-orange-300 bg-orange-50 px-1.5 py-0.5">
                    {row.original.payment_status === 'waiting' ? (
                        <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
                            <FiLoader className="h-4" /> Waiting
                        </div>
                    ) : null}
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Transaction Status',
            cell: ({ row }) => (
                <div className="w-fit rounded border border-orange-300 bg-orange-50 px-1.5 py-0.5">
                    {row.original.status === 'pending' ? (
                        <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
                            <FiLoader className="h-4" /> Pending
                        </div>
                    ) : null}
                </div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Issued Date',
            cell: ({ row }) => {
                const issued = format(
                    new Date(row.original.created_at),
                    'MMMM dd, yyyy H:ii:ss',
                );
                return issued;
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <Button
                        onClick={() =>
                            router.visit(`/transaction/${row.original.id}/show`)
                        }
                        // className="px-2 text-xs"
                        size="sm"
                    >
                        Detail
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="p-4">
                <div className="mx-auto flex w-full flex-col gap-4">
                    <DataTable<Transaction>
                        showIndexColumn
                        columns={columns}
                        data={transactions}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
