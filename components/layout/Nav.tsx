"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4 sm:px-6">
        {links.map(({ href, label }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
