"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/contact", label: "Contact" },
] as const;

const touchTargetClass =
  "min-h-[44px] min-w-[44px] flex items-center justify-center";

function NavLink({
  href,
  label,
  isActive,
  onClick,
  className,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-foreground hover:bg-accent/50 hover:text-accent-foreground",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const closeSheet = useCallback(() => setSheetOpen(false), []);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-6 px-4 sm:px-6 md:justify-start">
        {/* Desktop: full nav (md and up) — secondary links + primary CTA */}
        <div className="hidden md:flex md:items-center md:gap-1 md:flex-1">
          {links
            .filter((l) => l.href !== "/contact")
            .map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <span key={href} className={touchTargetClass}>
                  <NavLink href={href} label={label} isActive={isActive} />
                </span>
              );
            })}
          <span className={cn(touchTargetClass, "ml-auto")}>
            <Button asChild size="lg" className={touchTargetClass}>
              <Link
                href="/contact"
                aria-label="Go to Contact"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center"
              >
                Contact
              </Link>
            </Button>
          </span>
        </div>

        {/* Mobile: hamburger + sheet (below md) */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(touchTargetClass, "shrink-0")}
                aria-label="Open menu"
                aria-expanded={sheetOpen}
              >
                <Menu className="size-6" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={true}
              className="flex flex-col gap-0 p-0"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Main navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-0 pt-6">
                {links
                  .filter((l) => l.href !== "/contact")
                  .map(({ href, label }) => {
                    const isActive =
                      href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(href);
                    return (
                      <span
                        key={href}
                        className={cn(
                          touchTargetClass,
                          "w-full justify-start px-4 [&>a]:w-full [&>a]:min-h-[44px] [&>a]:items-center"
                        )}
                      >
                        <NavLink
                          href={href}
                          label={label}
                          isActive={isActive}
                          onClick={closeSheet}
                        />
                      </span>
                    );
                  })}
                <span
                  className={cn(
                    touchTargetClass,
                    "w-full justify-start px-4 pt-2 [&>a]:min-h-[44px] [&>a]:min-w-[44px]"
                  )}
                >
                  <Button asChild size="lg" className="w-full justify-center">
                    <Link
                      href="/contact"
                      onClick={closeSheet}
                      aria-label="Go to Contact"
                    >
                      Contact
                    </Link>
                  </Button>
                </span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
