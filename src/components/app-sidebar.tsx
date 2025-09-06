'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  BookOpen,
  Settings,
  Shield,
  LifeBuoy,
  FileText,
  GraduationCap,
  Search
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SkillsphereLogo } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

const navLinks = [
  { href: '/survey', icon: FileText, label: 'Survey' },
  { href: '/learn', icon: GraduationCap, label: 'Learn' },
  { href: '/circles', icon: Users, label: 'Circles' },
  { href: '/my-learning', icon: BookOpen, label: 'My Learning' },
  { href: '/admin/content', icon: Shield, label: 'Admin' },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/learn') {
        return pathname.startsWith('/learn');
    }
     if (href === '/my-learning') {
        return pathname.startsWith('/my-learning');
    }
     if (href === '/circles') {
        return pathname.startsWith('/circles');
    }
    if (href === '/admin/content') {
        return pathname.startsWith('/admin');
    }
     if (href === '/dashboard') {
        return pathname === href;
    }
    return pathname === href;
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href="/dashboard"
                    className={cn("group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base", isActive('/dashboard') ? 'bg-primary' : 'bg-muted text-muted-foreground')}
                    >
                    <SkillsphereLogo className={cn("h-5 w-5 transition-all group-hover:scale-110", isActive('/dashboard') ? 'text-primary-foreground' : 'text-primary' )} />
                    <span className="sr-only">Skillsphere</span>
                </Link>
             </TooltipTrigger>
             <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Search</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LifeBuoy className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Help</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}