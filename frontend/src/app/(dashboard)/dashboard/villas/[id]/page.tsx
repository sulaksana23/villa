"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, BedDouble, Bath, DollarSign, Building2, Home } from "lucide-react";
import Link from "next/link";

interface Villa {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  address: string | null;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  totalRooms: number;
  amenities: string | null;
  isActive: boolean;
  isAvailable: boolean;
  villaType: { id: number; name: string };
  facilities: { id: number; name: string; icon: string | null }[];
  rooms: { id: number; roomNumber: string; status: string }[];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

export default function ShowVillaPage() {
  const router = useRouter();
  const params = useParams();
  const [villa, setVilla] = useState<Villa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ data: Villa }>(`/villas/${params.id}`)
      .then((res) => setVilla(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="h-64 rounded-xl bg-muted animate-pulse" />;
  if (!villa) return <p>Villa tidak ditemukan</p>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/villas"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div><h1 className="text-2xl font-bold">{villa.name}</h1><p className="text-muted-foreground">{villa.villaType.name}</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><DollarSign className="h-8 w-8 text-green-600" /><div><p className="text-xs text-muted-foreground">Harga/Malam</p><p className="text-xl font-bold">{formatCurrency(villa.pricePerNight)}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Users className="h-8 w-8 text-blue-600" /><div><p className="text-xs text-muted-foreground">Max Tamu</p><p className="text-xl font-bold">{villa.maxGuests}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Home className="h-8 w-8 text-purple-600" /><div><p className="text-xs text-muted-foreground">Total Kamar</p><p className="text-xl font-bold">{villa.totalRooms}</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Detail</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-muted-foreground">Kamar Tidur</p><p className="font-medium">{villa.bedrooms}</p></div>
            <div><p className="text-sm text-muted-foreground">Bathroom</p><p className="font-medium">{villa.bathrooms}</p></div>
            <div><p className="text-sm text-muted-foreground">Status</p><div className="flex gap-2 mt-1"><Badge variant={villa.isActive ? "default" : "secondary"}>{villa.isActive ? "Aktif" : "Nonaktif"}</Badge><Badge variant={villa.isAvailable ? "default" : "destructive"}>{villa.isAvailable ? "Tersedia" : "Penuh"}</Badge></div></div>
            {villa.location && <div><p className="text-sm text-muted-foreground">Lokasi</p><p className="font-medium flex items-center gap-1"><MapPin className="h-3 w-3" />{villa.location}</p></div>}
          </div>
          {villa.description && <div><p className="text-sm text-muted-foreground">Deskripsi</p><p className="mt-1">{villa.description}</p></div>}
          {villa.facilities.length > 0 && <div><p className="text-sm text-muted-foreground mb-2">Fasilitas</p><div className="flex flex-wrap gap-2">{villa.facilities.map((f) => <Badge key={f.id} variant="outline">{f.name}</Badge>)}</div></div>}
        </CardContent>
      </Card>

      {villa.rooms.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Daftar Kamar</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {villa.rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-2 rounded-lg border"><span className="text-sm font-medium">{room.roomNumber}</span><Badge variant={room.status === "available" ? "default" : room.status === "occupied" ? "destructive" : "secondary"}>{room.status}</Badge></div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}