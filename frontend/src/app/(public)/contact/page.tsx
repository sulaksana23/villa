"use client";
import { AnimatedSection } from "@/components/public/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <AnimatedSection className="max-w-3xl">
        <h1 className="text-3xl font-black">Kontak Kami</h1>
        <p className="text-muted-foreground mt-2">Respon &lt; 5 menit di jam kerja (08:00-22:00 WITA) • WA paling cepat</p>
      </AnimatedSection>

      <div className="grid lg:grid-cols-3 gap-6">
        <AnimatedSection className="lg:col-span-2">
          <form onSubmit={e=>{e.preventDefault(); toast.success("Pesan terkirim! Kami balas via WhatsApp <3 menit.")}} className="space-y-4 bg-white rounded-2xl border p-6 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Nama</Label><Input required placeholder="Nama lengkap"/></div>
              <div><Label>WhatsApp</Label><Input required placeholder="0812..."/></div>
            </div>
            <div><Label>Email</Label><Input type="email" placeholder="email@contoh.com"/></div>
            <div><Label>Pesan</Label><Textarea required placeholder="Tanya ketersediaan villa, tanggal, tamu..." rows={4}/></div>
            <Button type="submit" className="w-full rounded-xl py-6 font-bold">Kirim Pesan • Balas 3 menit</Button>
            <p className="text-xs text-center text-muted-foreground">Atau langsung <a href="https://wa.me/6281234567890" target="_blank" className="text-primary font-bold underline">Chat WhatsApp</a></p>
          </form>
        </AnimatedSection>

        <div className="space-y-4">
          <Card className="rounded-2xl"><CardContent className="p-5 space-y-3">
            <h4 className="font-bold flex items-center gap-2"><MessageCircle className="h-4 w-4 text-primary"/> Kontak Cepat</h4>
            <p className="text-sm flex items-center gap-2"><Phone className="h-4 w-4 text-primary"/> +62 812-3456-7890</p>
            <p className="text-sm flex items-center gap-2"><Mail className="h-4 w-4 text-primary"/> hello@villanusantara.id</p>
            <p className="text-sm flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/> Jl. Sunset Road No. 88, Bali</p>
            <p className="text-sm flex items-center gap-2"><Clock className="h-4 w-4 text-primary"/> 08:00-22:00 WITA • Setiap hari</p>
            <Button className="w-full rounded-xl" asChild><a href="https://wa.me/6281234567890" target="_blank">Chat WA Sekarang</a></Button>
          </CardContent></Card>
          <Card className="rounded-2xl overflow-hidden">
            <div className="h-64 bg-slate-100 relative">
              <img src="https://images.unsplash.com/photo-1526772661823-3f88f33771cd?w=600" alt="map" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center"><span className="bg-white px-4 py-2 rounded-full shadow font-bold text-sm">🗺️ Bali • Klik untuk Maps</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
