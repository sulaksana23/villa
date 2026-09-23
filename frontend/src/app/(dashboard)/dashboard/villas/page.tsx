"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2, Eye, Edit, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";

interface Villa {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  isActive: boolean;
  isAvailable: boolean;
  villaType: { id: number; name: string };
  images: { id: number; imagePath: string; isPrimary: boolean }[];
  _count: { rooms: number };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

export default function VillasPage() {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { hasPermission } = useAuthStore();

  async function loadVillas() {
    setLoading(true);
    try {
      const res = await apiFetch<any>("/villas", { params: { page, per_page: 10, search } });
      setVillas(res.data);
      setTotal(res.meta.total);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus villa ini?")) return;
    try {
      await apiFetch(`/villas/${id}`, { method: "DELETE" });
      toast.success("Villa berhasil dihapus");
      loadVillas();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    const timer = setTimeout(loadVillas, 300);
    return () => clearTimeout(timer);
  }, [page, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Villa</h1>
          <p className="text-muted-foreground">Kelola data villa Anda</p>
        </div>
        {hasPermission("create_villas") && (
          <Link href="/dashboard/villas/create">
            <Button><Plus className="h-4 w-4 mr-2" />Tambah Villa</Button>
          </Link>
        )}
      </div>

      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cari villa..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />)}
        </div>
      ) : villas.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><Building2 className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground">Belum ada data villa</p></CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {villas.map((villa) => (
            <Card key={villa.id} className="overflow-hidden">
              <div className="h-40 bg-muted relative">
                {villa.images[0] ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950 flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-blue-400" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950 flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-blue-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge variant={villa.isActive ? "default" : "secondary"}>{villa.isActive ? "Aktif" : "Nonaktif"}</Badge>
                  <Badge variant={villa.isAvailable ? "default" : "destructive"}>{villa.isAvailable ? "Tersedia" : "Penuh"}</Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{villa.name}</h3>
                  {villa.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />{villa.location}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{villa.villaType.name}</span>
                  <span className="font-semibold text-primary">{formatCurrency(villa.pricePerNight)}<span className="text-xs font-normal text-muted-foreground">/malam</span></span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{villa.bedrooms} Kamar Tidur</span>
                  <span>{villa.maxGuests} Tamu</span>
                  <span>{villa._count.rooms} Room</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link href={`/dashboard/villas/${villa.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full"><Eye className="h-3 w-3 mr-1" />Detail</Button></Link>
                  {hasPermission("edit_villas") && (
                    <Link href={`/dashboard/villas/${villa.id}/edit`} className="flex-1"><Button variant="outline" size="sm" className="w-full"><Edit className="h-3 w-3 mr-1" />Edit</Button></Link>
                  )}
                  {hasPermission("delete_villas") && (
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(villa.id)}><Trash2 className="h-3 w-3" /></Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}