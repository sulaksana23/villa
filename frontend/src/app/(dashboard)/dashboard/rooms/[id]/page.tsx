"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, BedDouble, DollarSign } from "lucide-react";
import Link from "next/link";

interface Room {
  id: number;
  roomNumber: string;
  status: string;
  availability: string;
  maxGuests: number;
  pricePerNight: number;
  description: string | null;
  floorNumber: number | null;
  isActive: boolean;
  villa: { id: number; name: string; location: string | null };
  roomType: { id: number; name: string };
  amenities: { id: number; name: string }[];
  pricing: { id: number; price: number; validFrom: string; validTo: string | null; season: string | null }[];
}

const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  occupied: "bg-blue-100 text-blue-800",
  reserved: "bg-yellow-100 text-yellow-800",
  cleaning: "bg-purple-100 text-purple-800",
  maintenance: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = { available: "Tersedia", occupied: "Terisi", reserved: "Reservasi", cleaning: "Bersihkan", maintenance: "Maintenance" };

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

export default function ShowRoomPage() {
  const params = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ data: Room }>(`/rooms/${params.id}`).then((res) => setRoom(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="h-64 rounded-xl bg-muted animate-pulse" />;
  if (!room) return <p>Kamar tidak ditemukan</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/rooms"><button className="p-2 rounded-lg hover:bg-accent"><ArrowLeft className="h-4 w-4" /></button></Link>
        <div><h1 className="text-2xl font-bold">Kamar {room.roomNumber}</h1><p className="text-muted-foreground">{room.villa.name} &middot; {room.roomType.name}</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><DollarSign className="h-8 w-8 text-green-600" /><div><p className="text-xs text-muted-foreground">Harga/Malam</p><p className="text-xl font-bold">{formatCurrency(room.pricePerNight)}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Users className="h-8 w-8 text-blue-600" /><div><p className="text-xs text-muted-foreground">Max Tamu</p><p className="text-xl font-bold">{room.maxGuests}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><BedDouble className="h-8 w-8 text-purple-600" /><div><p className="text-xs text-muted-foreground">Status</p><p className={`text-xl font-bold ${statusColors[room.status]?.split(" ")[1] || ""}`}>{statusLabels[room.status]}</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Detail Kamar</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-muted-foreground">Villa</p><p className="font-medium">{room.villa.name}</p></div>
            <div><p className="text-sm text-muted-foreground">Tipe Kamar</p><p className="font-medium">{room.roomType.name}</p></div>
            <div><p className="text-sm text-muted-foreground">Lantai</p><p className="font-medium">{room.floorNumber || "-"}</p></div>
            <div><p className="text-sm text-muted-foreground">Ketersediaan</p><Badge variant={room.availability === "available" ? "default" : "destructive"}>{room.availability === "available" ? "Tersedia" : "Tidak Tersedia"}</Badge></div>
          </div>
          {room.description && <div><p className="text-sm text-muted-foreground">Deskripsi</p><p className="mt-1">{room.description}</p></div>}
          {room.amenities.length > 0 && <div><p className="text-sm text-muted-foreground mb-2">Amenitas</p><div className="flex flex-wrap gap-2">{room.amenities.map((a) => <Badge key={a.id} variant="outline">{a.name}</Badge>)}</div></div>}
        </CardContent>
      </Card>

      {room.pricing.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {room.pricing.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div><p className="font-medium">{formatCurrency(p.price)}/malam</p><p className="text-sm text-muted-foreground">{p.validFrom} - {p.validTo || " ongoing"}</p></div>
                  {p.season && <Badge>{p.season}</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}