import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <p className="text-6xl">🏝️</p>
      <h1 className="text-3xl font-black">404 • Villa tidak ditemukan</h1>
      <p className="text-muted-foreground">Halaman yang kamu cari tidak ada atau villa sudah full.</p>
      <div className="flex gap-3">
        <Button asChild><Link href="/">Ke Beranda</Link></Button>
        <Button variant="outline" asChild><Link href="/villas">Lihat Villa</Link></Button>
      </div>
    </div>
  );
}
