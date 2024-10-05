import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  isActive?: boolean;
  label: string;
};

export const NavButton = ({ href, isActive, label }: Props) => {
  return (
    <Button
      asChild
      className={cn(
        "w-full justify-between border-none font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto",
        isActive ? "bg-white/10 text-white" : "bg-transparent",
      )}
      size="sm"
      variant="outline"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
