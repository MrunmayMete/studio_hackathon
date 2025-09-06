
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  BookOpen,
  Settings,
  Shield,
  LifeBuoy,
  LayoutDashboard,
  Search,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MorningOwlsLogo } from '@/lib/icons';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/my-learning', icon: BookOpen, label: 'My Learning' },
  { href: '/circles', icon: Users, label: 'Circles' },
  { href: '/admin/content', icon: Shield, label: 'Admin' },
];

const secondaryNavLinks = [
    { href: '/support', icon: LifeBuoy, label: 'Help' },
    { href: '/settings', icon: Settings, label: 'Settings' },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/my-learning') return pathname.startsWith('/my-learning');
    if (href === '/circles') return pathname.startsWith('/circles');
    if (href === '/admin/content') return pathname.startsWith('/admin');
    return pathname === href;
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <MorningOwlsLogo className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Morning_Owls</span>
          </Link>
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    isActive(href) && 'bg-accent text-accent-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {secondaryNavLinks.map(({ href, icon: Icon, label }) => (
            <Tooltip key={label}>
                <TooltipTrigger asChild>
                    <Link
                    href={href}
                    className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                        pathname.startsWith(href) && 'bg-accent text-accent-foreground'
                    )}
                    >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
           ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
