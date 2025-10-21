import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FaqForm, FaqFormValues } from './Partials/FaqForm';

interface EditProps {
    faq: FaqFormValues & { id: number };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'FAQ - Edit', href: '/faqs/edit' },
];

export default function Edit({ faq }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit FAQ" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit FAQ</h1>
                    <Separator className="my-4" />
                    <FaqForm
                        initialData={faq}
                        submitUrl={`/faqs/${faq.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
