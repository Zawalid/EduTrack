import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <LayoutGrid className="size-4" aria-hidden="true" />
          <span className="hidden font-bold md:inline-block">EduTrack</span>
        </Link>
        <nav className="flex w-full items-center gap-6 text-sm">
        
        </nav>
        <nav className="flex justify-end items-center gap-5">
          <ThemeToggle />
          <UserNav />
        </nav>
      </div>
    </header>
  );
}
