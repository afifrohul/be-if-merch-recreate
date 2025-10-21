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

type FAQ = {
    id: number;
    question: string;
    answer: string;
};

interface FaqIndexProps {
    faqs: FAQ[];
}

export default function Index({ faqs }: FaqIndexProps) {
    const columns: ColumnDef<FAQ>[] = [
        {
            accessorKey: 'question',
            header: 'Question',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'answer',
            header: 'Answer',
            cell: (info) => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton url={`/faqs/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/faqs/${row.original.id}`}
                        confirmMessage="Are you sure to delete this FAQ?"
                    />
                </div>
            ),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-4">
                <div className="mx-auto flex w-full flex-col gap-4">
                    <DataTable<FAQ>
                        showIndexColumn
                        columns={columns}
                        data={faqs}
                        createButton={
                            <Button
                                variant="outline"
                                onClick={() => router.get('/faqs/create')}
                            >
                                <FaPlusCircle className="mr-2" /> Create New FAQ
                            </Button>
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
