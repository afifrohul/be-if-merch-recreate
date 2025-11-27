import DashboardCard from '@/components/dashboard-card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    BookImageIcon,
    BoxIcon,
    BriefcaseIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    TableOfContentsIcon,
    UserIcon,
    WalletIcon,
} from 'lucide-react';
import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ ...props }) {
    function generateStrongOklchShades(
        count: number,
        base = { l: 0.75, c: 0.15, h: 60 },
    ) {
        const colors = [];

        for (let i = 0; i < count; i++) {
            const t = i / Math.max(1, count - 1);

            const L = 0.85 - t * 0.4;

            const C =
                t < 0.5 ? base.c + t * 0.14 : base.c + 0.14 - (t - 0.5) * 0.2;

            const H = base.h - t * 25;

            colors.push(
                `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(3)})`,
            );
        }

        return colors;
    }
    const COLORS_CATEGORY = generateStrongOklchShades(
        props.transactionByCategory.length,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-4 gap-4">
                    <DashboardCard
                        header="User Customer"
                        icon={UserIcon}
                        data={props.customerCount}
                        footer="Total User Customer(s)"
                    />
                    <DashboardCard
                        header="Product Category"
                        icon={BriefcaseIcon}
                        data={props.categoryCount}
                        footer="Total Product Category(s)"
                    />
                    <DashboardCard
                        header="Product"
                        icon={ShoppingBagIcon}
                        data={props.productCount}
                        footer="Total Product(s)"
                    />
                    <DashboardCard
                        header="Product Variant"
                        icon={BoxIcon}
                        data={props.variantCount}
                        footer="Total Product Variant(s)"
                    />
                    <DashboardCard
                        header="Product Gallery"
                        icon={BookImageIcon}
                        data={props.galleryCount}
                        footer="Total Product Gallery(s)"
                    />
                    <DashboardCard
                        header="FAQ"
                        icon={TableOfContentsIcon}
                        data={props.faqCount}
                        footer="Total FAQ(s)"
                    />
                    <DashboardCard
                        header="Transaction"
                        icon={ShoppingCartIcon}
                        data={props.transactionCount}
                        footer="Total Transaction(s)"
                    />
                    <DashboardCard
                        header="Transaction Income"
                        icon={WalletIcon}
                        data={new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            maximumFractionDigits: 0,
                        }).format(props.transactionIncome)}
                        footer="Total Transaction Income(s)"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded border p-6">
                        <h1 className="text-sm font-semibold">
                            Transaction Items by Category
                        </h1>
                        <Separator className="my-2"></Separator>
                        <div className="mt-4 h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={props.transactionByCategory}
                                        dataKey="total_quantity"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        label
                                    >
                                        {props.transactionByCategory.map(
                                            (entry: any, index: number) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS_CATEGORY[index]
                                                    }
                                                />
                                            ),
                                        )}
                                    </Pie>
                                    <Tooltip />
                                    <Legend
                                        layout="vertical"
                                        align="right"
                                        verticalAlign="middle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="rounded border p-6">
                        <h1 className="text-sm font-semibold">
                            Income by Year
                        </h1>
                        <Separator className="my-2"></Separator>
                        <div className="mt-4 h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={props.transactionByYear}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 30,
                                        bottom: 10,
                                    }}
                                >
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                maximumFractionDigits: 0,
                                            }).format(value)
                                        }
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="total_income"
                                        name="Total Income"
                                        fill="#ff6900"
                                        radius={[4, 4, 0, 0]}
                                        barSize={75}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
