'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookMarked, Users, ClipboardCheck } from "lucide-react";

const adminNavLinks = [
    { name: "Content", href: "/admin/content", icon: BookMarked },
    { name: "Groups", href: "/admin/groups", icon: Users },
    { name: "Assignments", href: "/admin/assignments", icon: ClipboardCheck },
]

export function AdminTabs() {
    const pathname = usePathname();

    const getCurrentTabValue = () => {
        if (pathname.startsWith('/admin/groups')) return 'groups';
        if (pathname.startsWith('/admin/assignments')) return 'assignments';
        return 'content';
    }

    return (
        <Tabs value={getCurrentTabValue()}>
            <TabsList>
                {adminNavLinks.map((link) => (
                    <Link href={link.href} key={link.name} legacyBehavior passHref>
                        <TabsTrigger value={link.name.toLowerCase()}>
                            <link.icon className="mr-2 h-4 w-4" />
                           {link.name}
                        </TabsTrigger>
                    </Link>
                ))}
            </TabsList>
        </Tabs>
    )
}