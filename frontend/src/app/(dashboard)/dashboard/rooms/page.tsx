"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Search, BedDouble, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";

interface Room {
  id: number;
  roomNumber: string;
  status: string;
  availability: string;
  maxGuests: number;
  pricePerNight: number;
  floorNumber: number | null;
  isActive: boolean;
  villa: { id: number; name: string };
  roomType: { id: number; name: string };
  images: { id: number; imagePath: string; isPrimary: boolean }[];
}

const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  occupied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  reserved: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  cleaning: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  maintenance: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const statusLabels: Record<string, string> = {
  available: "Tersedia",
  occupied: "Terisi",
  reserved: "Reservasi",
  cleaning: "Bersihkan",
  maintenance: "Maintenance",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [villaFilter, setVillaFilter] = useState("");
  const [villas, setVillas] = useState<{ id: number; name: string }[]>([]);
  const [page, setPage] = useState(1);
  const { hasPermission } = useAuthStore();

  async function loadRooms() {
    setLoading(true);
    try {
      const res = await apiFetch<any>("/rooms", {
        params: { page, per_page: 12, search, status: statusFilter || undefined, villa_id: villaFilter ? parseInt(villaFilter) : undefined },
      });
      setRooms(res.data);
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus kamar ini?")) return;
    try { await apiFetch(`/rooms/${id}`, { method: "DELETE" }); toast.success("Kamar berhasil dihapus"); loadRooms(); }
    catch (err: any) { toast.error(err.message); }
  }

  useEffect(() => {
    apiFetch<any>("/rooms/villas").then((res) => setVillas(res.data));
  }, []);

  useEffect(() => {
    const timer = setTimeout(loadRooms, 300);
    return () => clearTimeout(timer);
  }, [page, search, statusFilter, villaFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Manajemen Kamar</h1><p className="text-muted-foreground">Kelola data kamar</p></div>
        {hasPermission("create_rooms") && (
          <Link href="/dashboard/rooms/create"><Button><Plus className="h-4 w-4 mr-2" />Tambah Kamar</Button></Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari nomor kamar..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="available">Tersedia</SelectItem>
            <SelectItem value="occupied">Terisi</SelectItem>
            <SelectItem value="reserved">Reservasi</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={villaFilter} onValueChange={(v) => { setVillaFilter(v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Villa" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Villa</SelectItem>
            {villas.map((v) => <SelectItem key={v.id} value={String(v.id)}>{v.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />)}
        </div>
      ) : rooms.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><BedDouble className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground">Belum ada data kamar</p></CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className={`h-3 ${room.status === "available" ? "bg-green-500" : room.status === "occupied" ? "bg-blue-500" : room.status === "reserved" ? "bg-yellow-500" : room.status === "cleaning" ? "bg-purple-500" : "bg-red-500"}`} />
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{room.roomNumber}</h3>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusColors[room.status]}`}>{statusLabels[room.status]}</span>
                </div>
                <p className="text-sm text-muted-foreground">{room.villa.name} &middot; {room.roomType.name}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Harga/Malam</span>
                  <span className="font-semibold">{formatCurrency(room.pricePerNight)}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Max {room.maxGuests} tamu</span>
                  {room.floorNumber && <span>Lantai {room.floorNumber}</span>}
                </div>
                <div className="flex gap-2 pt-2">
                  <Link href={`/dashboard/rooms/${room.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full"><Eye className="h-3 w-3 mr-1" />Detail</Button></Link>
                  {hasPermission("edit_rooms") && (
                    <Link href={`/dashboard/rooms/${room.id}/edit`} className="flex-1"><Button variant="outline" size="sm" className="w-full"><Edit className="h-3 w-3 mr-1" />Edit</Button></Link>
                  )}
                  {hasPermission("delete_rooms") && (
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(room.id)}><Trash2 className="h-3 w-3" /></Button>
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