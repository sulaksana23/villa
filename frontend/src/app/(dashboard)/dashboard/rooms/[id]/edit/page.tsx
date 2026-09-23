"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [villas, setVillas] = useState<{ id: number; name: string }[]>([]);
  const [roomTypes, setRoomTypes] = useState<{ id: number; name: string }[]>([]);
  const [amenities, setAmenities] = useState<{ id: number; name: string }[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [form, setForm] = useState({
    roomNumber: "", villaId: "", roomTypeId: "", status: "available" as string,
    maxGuests: "2", pricePerNight: "", description: "", floorNumber: "1", isActive: true,
  });

  useEffect(() => {
    Promise.all([apiFetch<any>(`/rooms/${params.id}`), apiFetch<any>("/rooms/villas"), apiFetch<any>("/rooms/room-types"), apiFetch<any>("/rooms/amenities")]).then(
      ([roomRes, vRes, rtRes, aRes]) => {
        const r = roomRes.data;
        setForm({
          roomNumber: r.roomNumber, villaId: String(r.villaId), roomTypeId: String(r.roomTypeId),
          status: r.status, maxGuests: String(r.maxGuests), pricePerNight: String(r.pricePerNight),
          description: r.description || "", floorNumber: String(r.floorNumber || "1"), isActive: r.isActive,
        });
        setVillas(vRes.data); setRoomTypes(rtRes.data); setAmenities(aRes.data);
        setSelectedAmenities(r.amenities.map((a: any) => a.id));
      }
    );
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch(`/rooms/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...form, villaId: parseInt(form.villaId), roomTypeId: parseInt(form.roomTypeId),
          maxGuests: parseInt(form.maxGuests), pricePerNight: parseFloat(form.pricePerNight),
          floorNumber: parseInt(form.floorNumber), amenityIds: selectedAmenities,
        }),
      });
      toast.success("Kamar berhasil diupdate");
      router.push("/dashboard/rooms");
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/rooms"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div><h1 className="text-2xl font-bold">Edit Kamar</h1><p className="text-muted-foreground">Update informasi kamar</p></div>
      </div>
      <Card>
        <CardHeader><CardTitle>Informasi Kamar</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Nomor Kamar</Label><Input value={form.roomNumber} onChange={(e) => setForm({ ...form, roomNumber: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Villa</Label>
                <Select value={form.villaId} onValueChange={(v) => setForm({ ...form, villaId: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih villa" /></SelectTrigger>
                  <SelectContent>{villas.map((v) => <SelectItem key={v.id} value={String(v.id)}>{v.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Tipe Kamar</Label>
                <Select value={form.roomTypeId} onValueChange={(v) => setForm({ ...form, roomTypeId: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
                  <SelectContent>{roomTypes.map((rt) => <SelectItem key={rt.id} value={String(rt.id)}>{rt.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Tersedia</SelectItem><SelectItem value="occupied">Terisi</SelectItem><SelectItem value="reserved">Reservasi</SelectItem><SelectItem value="cleaning">Cleaning</SelectItem><SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Harga/Malam</Label><Input type="number" value={form.pricePerNight} onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Max Tamu</Label><Input type="number" value={form.maxGuests} onChange={(e) => setForm({ ...form, maxGuests: e.target.value })} /></div>
              <div className="space-y-2"><Label>Lantai</Label><Input type="number" value={form.floorNumber} onChange={(e) => setForm({ ...form, floorNumber: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Amenitas</Label><div className="flex flex-wrap gap-2">{amenities.map((a) => (<button key={a.id} type="button" onClick={() => setSelectedAmenities((prev) => prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id])} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedAmenities.includes(a.id) ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent"}`}>{a.name}</button>))}</div></div>
            <div className="space-y-2"><Label>Deskripsi</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="flex gap-2 pt-4"><Button type="submit" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Update</Button><Link href="/dashboard/rooms"><Button type="button" variant="outline">Batal</Button></Link></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}