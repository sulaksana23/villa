"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

interface VillaType { id: number; name: string; }
interface Facility { id: number; name: string; icon: string | null; }

export default function CreateVillaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [villaTypes, setVillaTypes] = useState<VillaType[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  const [form, setForm] = useState({
    name: "", description: "", villaTypeId: "", location: "", address: "",
    pricePerNight: "", maxGuests: "4", bedrooms: "1", bathrooms: "1", totalRooms: "0",
    amenities: "", isActive: true, isAvailable: true,
  });

  useEffect(() => {
    Promise.all([apiFetch<any>("/villas/villa-types"), apiFetch<any>("/villas/facilities")]).then(
      ([typesRes, facRes]) => { setVillaTypes(typesRes.data); setFacilities(facRes.data); }
    );
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/villas", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          villaTypeId: parseInt(form.villaTypeId),
          pricePerNight: parseFloat(form.pricePerNight),
          maxGuests: parseInt(form.maxGuests),
          bedrooms: parseInt(form.bedrooms),
          bathrooms: parseInt(form.bathrooms),
          totalRooms: parseInt(form.totalRooms),
          facilityIds: selectedFacilities,
        }),
      });
      toast.success("Villa berhasil ditambahkan");
      router.push("/dashboard/villas");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/villas"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div><h1 className="text-2xl font-bold">Tambah Villa</h1><p className="text-muted-foreground">Tambahkan villa baru ke sistem</p></div>
      </div>

      <Card>
        <CardHeader><CardTitle>Informasi Villa</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Nama Villa</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Deskripsi</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tipe Villa</Label>
                <Select value={form.villaTypeId} onValueChange={(v) => setForm({ ...form, villaTypeId: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
                  <SelectContent>{villaTypes.map((vt) => <SelectItem key={vt.id} value={String(vt.id)}>{vt.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Harga/Malam</Label>
                <Input type="number" value={form.pricePerNight} onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Lokasi</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Max Tamu</Label>
                <Input type="number" value={form.maxGuests} onChange={(e) => setForm({ ...form, maxGuests: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Fasilitas</Label>
              <div className="flex flex-wrap gap-2">
                {facilities.map((f) => (
                  <button key={f.id} type="button" onClick={() => setSelectedFacilities((prev) => prev.includes(f.id) ? prev.filter((x) => x !== f.id) : [...prev, f.id])}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedFacilities.includes(f.id) ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent"}`}
                  >{f.name}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Simpan</Button>
              <Link href="/dashboard/villas"><Button type="button" variant="outline">Batal</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}