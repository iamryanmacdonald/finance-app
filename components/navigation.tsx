"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";

import { NavButton } from "@/components/nav-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  { href: "/", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
  { href: "/accounts", label: "Accounts" },
  { href: "/categories", label: "Categories" },
  { href: "/settings", label: "Settings" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMedia("(max-width: 1024px)", false);
  const pathname = usePathname();
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile)
    return (
      <Sheet onOpenChange={setIsOpen} open={isOpen}>
        <SheetTrigger>
          <Button
            className="border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
            size="sm"
            variant="outline"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="px-2" side="left">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                className="w-full justify-start"
                key={route.href}
                onClick={() => onClick(route.href)}
                variant={route.href === pathname ? "secondary" : "ghost"}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );

  return (
    <nav className="hidden items-center gap-x-2 overflow-x-auto lg:flex">
      {routes.map((route) => (
        <NavButton
          href={route.href}
          isActive={pathname === route.href}
          key={route.href}
          label={route.label}
        />
      ))}
    </nav>
  );
};
