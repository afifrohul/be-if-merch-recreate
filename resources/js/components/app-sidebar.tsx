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
    ShoppingCart,
    TableOfContents,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Products Category',
        href: '/product-categories',
        icon: Briefcase,
    },
    {
        title: 'Products',
        href: '/products',
        icon: ShoppingCart,
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
                <NavMain items={mainNavItems} header="Master Data" />
                <NavMain items={transactions} header="Transactions" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
