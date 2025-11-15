import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { BsExclamationCircle } from 'react-icons/bs';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FiLoader } from 'react-icons/fi';
import { RiMoneyDollarCircleLine, RiRefund2Line } from 'react-icons/ri';
import { RxCrossCircled } from 'react-icons/rx';
import { TbClockExclamation } from 'react-icons/tb';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Detail Transactions',
        href: '/transaction/show',
    },
];

type Profile = {
    id: number;
    gender: string;
    address: string;
    phone_number: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    profile: Profile;
};

type Item = {
    id: number;
    transaction_id: number;
    product_id?: number;
    product_variant_id?: number;
    product_name: string;
    variant_name?: string;
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
    payment_method?: string;
    payment_status: string;
    payment_type: string;
    paid_at?: string;
    canceled_at?: string;
    completed_at?: string;
    notes?: string;
    midtrans_payload?: string;
    midtrans_order_id?: string;
    midtrans_transaction_id?: string;
    midtrans_snap_token?: string;
    user: User;
    items: Item[];
    created_at: string;
};

interface TransactionProps {
    transaction: Transaction;
}

export default function Detail({ transaction }: TransactionProps) {
    console.log(transaction);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="p-4">
                <div className="mx-auto flex w-full flex-col gap-4">
                    <div className="rounded-md border p-4">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h2 className="text-base font-medium">
                                Transaction Detail
                            </h2>
                        </div>
                        <Separator className="my-4"></Separator>
                        <div className="mt-4 grid grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Customer Name
                                    </p>
                                    <p>{transaction.user.name}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Customer Email
                                    </p>
                                    <p>{transaction.user.email}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Customer Gender
                                    </p>
                                    <p>{transaction.user.profile.gender}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Customer Phone Number
                                    </p>
                                    <p>
                                        {transaction.user.profile.phone_number}
                                    </p>
                                </div>
                                <div className="flex flex-col text-sm gap-2">
                                    <p className="font-semibold">
                                        Deliver Address
                                    </p>
                                    <p>{transaction.user.profile.address}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">Issued Date</p>
                                    <p>
                                        {format(
                                            new Date(transaction.created_at),
                                            'MMMM dd, yyyy H:ii:ss',
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Invoice Number
                                    </p>
                                    <p>{transaction.invoice_number}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Midtrans Order ID
                                    </p>
                                    <p>{transaction.midtrans_order_id}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Midtrans Transaction ID
                                    </p>
                                    <p>{transaction.midtrans_transaction_id}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Payment Method
                                    </p>
                                    <p>
                                        {transaction.payment_method ? (
                                            <span>
                                                {transaction.payment_method}
                                            </span>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Payment Type
                                    </p>
                                    <p>
                                        {transaction.payment_type ? (
                                            <span>
                                                {transaction.payment_type}
                                            </span>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Payment Status
                                    </p>
                                    <p>
                                        {transaction.payment_status ===
                                        'waiting' ? (
                                            <div className="w-fit rounded border border-orange-300 bg-orange-50 px-1.5 py-0.5 font-medium text-orange-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <FiLoader className="h-4" />{' '}
                                                    Waiting
                                                </div>
                                            </div>
                                        ) : transaction.payment_status ===
                                          'paid' ? (
                                            <div className="w-fit rounded border border-green-300 bg-green-50 px-1.5 py-0.5 font-medium text-green-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <RiMoneyDollarCircleLine className="h-4" />{' '}
                                                    Paid
                                                </div>
                                            </div>
                                        ) : transaction.payment_status ===
                                          'failed' ? (
                                            <div className="w-fit rounded border border-red-300 bg-red-50 px-1.5 py-0.5 font-medium text-red-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <BsExclamationCircle className="h-4" />{' '}
                                                    Failed
                                                </div>
                                            </div>
                                        ) : transaction.payment_status ===
                                          'expired' ? (
                                            <div className="w-fit rounded border border-red-300 bg-red-50 px-1.5 py-0.5 font-medium text-red-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <TbClockExclamation className="h-4" />{' '}
                                                    Expired
                                                </div>
                                            </div>
                                        ) : transaction.payment_status ===
                                          'refunded' ? (
                                            <div className="w-fit rounded border border-red-300 bg-red-50 px-1.5 py-0.5 font-medium text-red-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <RiRefund2Line className="h-4" />{' '}
                                                    Refunded
                                                </div>
                                            </div>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold">
                                        Transaction Status
                                    </p>
                                    <p>
                                        {transaction.status === 'pending' ? (
                                            <div className="w-fit rounded border border-orange-300 bg-orange-50 px-1.5 py-0.5 font-medium text-orange-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <FiLoader className="h-4" />{' '}
                                                    Pending
                                                </div>
                                            </div>
                                        ) : transaction.status === 'paid' ? (
                                            <div className="w-fit rounded border border-green-300 bg-green-50 px-1.5 py-0.5 font-medium text-green-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <RiMoneyDollarCircleLine className="h-4" />{' '}
                                                    Paid
                                                </div>
                                            </div>
                                        ) : transaction.status ===
                                          'canceled' ? (
                                            <div className="w-fit rounded border border-red-300 bg-red-50 px-1.5 py-0.5 font-medium text-red-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <RxCrossCircled className="h-4" />{' '}
                                                    Canceled
                                                </div>
                                            </div>
                                        ) : transaction.status ===
                                          'completed' ? (
                                            <div className="w-fit rounded border border-green-300 bg-green-50 px-1.5 py-0.5 font-medium text-green-500">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <FaRegCircleCheck className="h-4" />{' '}
                                                    Completed
                                                </div>
                                            </div>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4"></Separator>
                        <div className="mt-4">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="py-2 font-semibold">
                                            Product
                                        </th>
                                        <th className="py-2 font-semibold">
                                            SKU
                                        </th>
                                        <th className="py-2 text-center font-semibold">
                                            Qty
                                        </th>
                                        <th className="py-2 text-right font-semibold">
                                            Price
                                        </th>
                                        <th className="py-2 text-right font-semibold">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {transaction.items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="py-2">
                                                {item.product_name}
                                                {item.variant_name && (
                                                    <span className="text-gray-500">
                                                        {' '}
                                                        | {item.variant_name}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-2">
                                                {item.sku || '-'}
                                            </td>
                                            <td className="py-2 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="py-2 text-right">
                                                {new Intl.NumberFormat(
                                                    'id-ID',
                                                    {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                    },
                                                ).format(item.price)}
                                            </td>
                                            <td className="py-2 text-right font-medium">
                                                {new Intl.NumberFormat(
                                                    'id-ID',
                                                    {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                    },
                                                ).format(item.subtotal)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Separator className="my-4"></Separator>
                            <div className="w-full">
                                <p className="text-right text-sm font-semibold">
                                    Total:{' '}
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(transaction.total_amount)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border p-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Midtrans Payload
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {transaction.midtrans_payload ? (
                                        <pre className="rounded bg-gray-100 p-4 text-sm break-all whitespace-pre-wrap">
                                            <code>
                                                {JSON.stringify(
                                                    transaction.midtrans_payload,
                                                    null,
                                                    2,
                                                )}
                                            </code>
                                        </pre>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <div className="mt-2 flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
