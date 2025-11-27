import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/user',
    },
];

type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

interface UserIndexProps {
    users: User[];
}

export default function Index({ users }: UserIndexProps) {
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            cell: (info) =>
                format(
                    new Date(info.getValue() as string),
                    'MMMM dd, yyyy H:ii:ss',
                ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <DeleteButton
                        url={`/users/${row.original.id}`}
                        confirmMessage="Are you sure to delete this user?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="p-4">
                <div className="mx-auto flex w-full flex-col gap-4">
                    <DataTable<User>
                        showIndexColumn
                        columns={columns}
                        data={users}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
