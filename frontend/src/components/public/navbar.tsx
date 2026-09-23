"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Mountain, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/villas", label: "Villa" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 animate-fadeIn">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <Mountain className="h-5 w-5" />
          </span>
          <span className="tracking-tight">Villa<span className="text-primary">Nusantara</span></span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === l.href ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href="tel:+6281234567890" className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" /> +62 812-3456-7890
          </a>
          <Button variant="outline" asChild>
            <Link href="/login">Masuk</Link>
          </Button>
          <Button asChild>
            <Link href="/villas">Booking Sekarang</Link>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cn("block rounded-md px-3 py-2 text-sm font-medium", pathname===l.href ? "bg-primary text-white":"bg-accent")}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" asChild><Link href="/login">Masuk</Link></Button>
            <Button className="flex-1" asChild><Link href="/villas">Booking</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
}
