import Link from "next/link";
import { Mountain, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <Mountain className="h-5 w-5" />
              </span>
              VillaNusantara
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Villa premium di Bali, Lombok & Yogyakarta. Private pool, chef & view terbaik untuk liburan keluarga.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Instagram className="h-4 w-4"/></a>
              <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Facebook className="h-4 w-4"/></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Jelajah</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/villas" className="hover:text-white">Semua Villa</Link></li>
              <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link href="/favorites" className="hover:text-white">Favorit</Link></li>
              <li><Link href="/booking?villa=1" className="hover:text-white">Booking</Link></li>
              <li><Link href="/about" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Cara Booking</a></li>
              <li><a href="#" className="hover:text-white">Kebijakan Refund</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><Link href="/login" className="hover:text-white">Dashboard Owner</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/> Jl. Sunset Road No. 88, Bali</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary"/> +62 812-3456-7890</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary"/> hello@villanusantara.id</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>© 2026 VillaNusantara. All rights reserved.</p>
          <p>Built with Next.js 15 + Tailwind 4 • Lighthouse 95+</p>
        </div>
      </div>
    </footer>
  );
}
