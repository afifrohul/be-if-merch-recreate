import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
// @ts-ignore: missing declaration for 'swagger-ui-react'
const SwaggerUI = require('swagger-ui-react').default;
import 'swagger-ui-react/swagger-ui.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: '/faqs',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="API Documentation" />
            <div className="space-y-4 p-4">
                <div className="mx-auto flex w-full flex-col rounded-md border p-4">
                    <p className="text-lg font-semibold">Documentation API</p>
                </div>
                <div className="mx-auto flex w-full flex-col rounded-md border p-4">
                    <div style={{ height: '85vh' }}>
                        <SwaggerUI
                            url="/storage/swagger/openapi.yaml"
                            docExpansion="list"
                            defaultModelsExpandDepth={1}
                            deepLinking={true}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
