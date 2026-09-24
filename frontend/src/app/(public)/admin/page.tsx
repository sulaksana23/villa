"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Calendar, DollarSign, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import { mockVillas } from "@/lib/mock-villas";
export default function AdminMockPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black">Admin Mock • Frontend Only</h1><p className="text-muted-foreground">Tanpa backend — data dari mockVillas 12 villa. Untuk demo Vercel.</p></div>
        <Badge className="bg-amber-500">Mock Mode</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { l:"Total Villa", v: mockVillas.length, i: Building2, c:"text-primary" },
          { l:"Tersedia", v: mockVillas.filter(v=>v.isAvailable).length, i: Eye, c:"text-emerald-600" },
          { l:"Booking Bulan Ini", v: "342", i: Calendar, c:"text-sky-600" },
          { l:"Revenue", v: "Rp 890jt", i: DollarSign, c:"text-amber-600" },
        ].map(s=> <Card key={s.l} className="rounded-2xl"><CardContent className="p-5 flex items-center gap-3"><s.i className={`h-8 w-8 ${s.c}`}/><div><p className="text-xs text-muted-foreground">{s.l}</p><p className="text-xl font-black">{s.v}</p></div></CardContent></Card>)}
      </div>
      <Card className="rounded-2xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary"/> Daftar Villa Mock (12)</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-muted-foreground border-b"><th className="py-2">Villa</th><th>Lokasi</th><th>Harga</th><th>Status</th><th>Aksi</th></tr></thead>
              <tbody>
                {mockVillas.map(v=> <tr key={v.id} className="border-b hover:bg-slate-50"><td className="py-3 font-medium">{v.name}</td><td>{v.location}</td><td>Rp {v.pricePerNight.toLocaleString("id-ID")}</td><td><Badge variant={v.isAvailable ? "default":"secondary"}>{v.isAvailable ? "Aktif":"Full"}</Badge></td><td><Button size="sm" variant="outline" asChild><Link href={`/villas/${v.id}`}>Lihat</Link></Button></td></tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-2xl bg-slate-900 text-white border-0"><CardContent className="p-6"><p className="text-sm opacity-80">Ini halaman admin mock frontend-only. Untuk CRUD real butuh backend `prisma` + `MySQL` yang sudah dihapus. Aktifkan lagi dengan `git checkout main -- backend` jika perlu.</p></CardContent></Card>
    </div>
  );
}
