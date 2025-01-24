"use client"; //bcoz usePathname hook runs on JS bundle

import { cn } from "@/lib/utils";
import { HomeIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//map the links for which we need array
export const dashboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2,
  },
];

export function DashboardLinks() {
  //to get pathname, next provides hook
  const pathname = usePathname();
  return (
    <>
      {dashboardLinks.map((link) => {
        return (
          <Link
            className={cn(
              pathname === link.href
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground",
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            )}
            href={link.href}
            key={link.id}
          >
            <link.icon className="size-4" />
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
