import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, BedDouble, ArrowRight } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan villa & kamar</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary"/> Villa</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Kelola villa, harga, fasilitas</p><Button asChild className="mt-4"><Link href="/dashboard/villas">Lihat Villa <ArrowRight className="ml-2 h-4 w-4"/></Link></Button></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><BedDouble className="h-5 w-5 text-emerald-600"/> Rooms</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Kelola kamar & status</p><Button asChild className="mt-4"><Link href="/dashboard/rooms">Lihat Rooms <ArrowRight className="ml-2 h-4 w-4"/></Link></Button></CardContent>
        </Card>
      </div>
    </div>
  );
}
