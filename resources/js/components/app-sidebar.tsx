import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookImage,
    Box,
    Briefcase,
    FileCheck2Icon,
    FileClockIcon,
    FileX2Icon,
    LayoutGrid,
    ShoppingBag,
    SquareDashedBottomCodeIcon,
    TableOfContents,
    User,
} from 'lucide-react';
import AppLogo from './app-logo';

const dashboards: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const users: NavItem[] = [
    {
        title: 'User Customer',
        href: '/users',
        icon: User,
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Products Category',
        href: '/product-categories',
        icon: Briefcase,
    },
    {
        title: 'Products',
        href: '/products',
        icon: ShoppingBag,
    },
    {
        title: 'Products Variant',
        href: '/product-variants',
        icon: Box,
    },
    {
        title: 'Products Gallery',
        href: '/product-galleries',
        icon: BookImage,
    },
    {
        title: 'FAQ',
        href: '/faqs',
        icon: TableOfContents,
    },
];

const transactions = [
    {
        title: 'Pending Transactions',
        href: '/pending-transactions',
        icon: FileClockIcon,
    },
    {
        title: 'Failed Transactions',
        href: '/failed-transactions',
        icon: FileX2Icon,
    },
    {
        title: 'Success Transactions',
        href: '/success-transactions',
        icon: FileCheck2Icon,
    },
];

const apis = [
    {
        title: 'Documentation API',
        href: '/docs/api',
        icon: SquareDashedBottomCodeIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={dashboards} header="Dashboard" />
                <NavMain items={users} header="User" />
                <NavMain items={mainNavItems} header="Master Data" />
                <NavMain items={transactions} header="Transactions" />
                <NavMain items={apis} header="Documentation API" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
