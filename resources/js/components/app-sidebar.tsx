import { NavFooter } from '@/components/nav-footer';
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
import { AwardIcon, BookOpen, Code2Icon, Folder, IdCard, LayoutGrid, QrCodeIcon, Stamp, StampIcon, TicketIcon, Users2Icon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/business/dashboard',
        icon: LayoutGrid,
    },
      {
        title: 'Issue Stamp',
        href: '/business/issue-stamp',
        icon: StampIcon,
    },
     {
        title: 'Perk Claims',
        href: '/business/perk-claims',
        icon: AwardIcon,
    },
       {
        title: 'Stamp Codes',
        href: '/business/stamp-codes',
        icon: Code2Icon,
    },
      {
        title: 'Card Templates',
        href: '/business/card-templates',
        icon: IdCard,
    },
      {
        title: 'Customers',
        href: '/business/customers',
        icon: Users2Icon,
    },
          {
        title: 'QR Studio',
        href: '/business/qr-studio',
        icon: QrCodeIcon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Tickets',
        href: '/business/tickets',
        icon: TicketIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href='/business/dashboard' prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
