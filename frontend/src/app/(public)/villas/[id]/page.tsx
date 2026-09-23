"use client";
import { useParams, useRouter } from "next/navigation";
import { mockVillas } from "@/lib/mock-villas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Users, BedDouble, Bath, Star, Waves, ChefHat, Wifi, Car, Check, ArrowLeft, Share2, Heart, Quote, ShieldCheck, Calendar, Award, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { VillaCard } from "@/components/public/villa-card";

export default function VillaDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const villa = mockVillas.find(v => String(v.id) === String(id));
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [activeImg, setActiveImg] = useState(0);

  if (!villa) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center"><p>Villa tidak ditemukan</p><Button className="mt-4" onClick={()=>router.push("/villas")}>Kembali</Button></div>;
  }

  const total = villa.pricePerNight * nights + 250000;
  const waMsg = encodeURIComponent(`Halo, saya mau booking ${villa.name} untuk ${nights} malam, ${guests} tamu. Total Rp ${total.toLocaleString("id-ID")}. Apakah tersedia?`);
  const waLink = `https://wa.me/6281234567890?text=${waMsg}`;
  const similar = mockVillas.filter(v=>v.id!==villa.id).slice(0,3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Button variant="ghost" onClick={()=>router.back()} className="gap-2 -ml-2"><ArrowLeft className="h-4 w-4"/> Kembali ke daftar</Button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-primary">Superhost • VillaNusantara</Badge>
            <Badge variant="outline" className="gap-1"><Award className="h-3 w-3"/> Verified</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">{villa.name}</h1>
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2"><MapPin className="h-4 w-4 text-primary"/>{villa.location} • <span className="flex items-center gap-1 text-slate-900 font-semibold"><Star className="h-4 w-4 fill-amber-400 text-amber-400"/>{villa.rating} (128 review)</span> • <span className="underline">Lihat lokasi</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full" onClick={()=>{navigator.clipboard.writeText(window.location.href); toast.success("Link disalin!")}}><Share2 className="h-4 w-4 mr-1"/> Share</Button>
          <Button variant="outline" size="sm" className="rounded-full"><Heart className="h-4 w-4 mr-1"/> Save</Button>
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-3">
        <div className="grid md:grid-cols-3 gap-2 rounded-2xl overflow-hidden h-[420px] bg-slate-100">
          <div className="md:col-span-2 h-full relative group cursor-pointer" onClick={()=>setActiveImg(0)}>
            <img src={villa.images[activeImg]} alt={villa.name} className="h-full w-full object-cover" />
            <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">📸 {villa.images.length} foto • Klik untuk ganti</span>
          </div>
          <div className="hidden md:grid grid-rows-3 gap-2 h-full">
            {villa.images.slice(0,3).map((img,i)=> (
              <img key={i} src={img} alt="" className={`h-full w-full object-cover rounded-xl cursor-pointer border-2 ${activeImg===i ? "border-primary":"border-transparent"} hover:opacity-80`} onClick={()=>setActiveImg(i)} />
            ))}
          </div>
        </div>
        <div className="flex gap-2 overflow-auto pb-1">
          {villa.images.map((img,i)=> <button key={i} onClick={()=>setActiveImg(i)} className={`shrink-0 h-16 w-24 rounded-xl overflow-hidden border-2 ${activeImg===i ? "border-primary":"border-transparent"}`}><img src={img} alt="" className="h-full w-full object-cover"/></button>)}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-wrap gap-4 text-sm border-b pb-4 bg-slate-50 rounded-xl p-3">
                <span className="flex items-center gap-2 font-medium"><Users className="h-4 w-4 text-primary"/>{villa.maxGuests} tamu</span>
                <span className="flex items-center gap-2 font-medium"><BedDouble className="h-4 w-4 text-primary"/>{villa.bedrooms} kamar</span>
                <span className="flex items-center gap-2 font-medium"><Bath className="h-4 w-4 text-primary"/>{villa.bathrooms} bath</span>
                <span className="flex items-center gap-2 font-medium"><Waves className="h-4 w-4 text-sky-500"/> Private Pool 12m</span>
              </div>
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">
                <Sparkles className="h-5 w-5 text-amber-600"/><span className="font-bold">Jarang tersedia</span> — 18 orang lihat ini dalam 24 jam terakhir
              </div>
              <h3 className="font-bold text-lg">Tentang villa ini</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{villa.description} Cocok untuk family gathering, honeymoon, atau retreat kantor. Dapur lengkap, BBQ, dan staff lokal siap bantu.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {villa.amenities.map(a=> <Badge key={a} variant="secondary" className="gap-1 rounded-full px-3 py-1"><Check className="h-3 w-3 text-emerald-600"/>{a}</Badge>)}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { icon: Wifi, label: "WiFi 200Mbps", sub:"Free" },
                  { icon: ChefHat, label: "Private Chef", sub:"On request" },
                  { icon: Car, label: "Free Parking", sub:"2 mobil" },
                  { icon: Waves, label: "Infinity Pool", sub:"12x4m" },
                ].map(f=> <div key={f.label} className="rounded-xl bg-slate-50 border p-3 text-center"><f.icon className="h-6 w-6 mx-auto mb-1 text-primary"/><p className="text-xs font-bold">{f.label}</p><p className="text-[11px] text-muted-foreground">{f.sub}</p></div>)}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-bold flex items-center gap-2"><Star className="h-5 w-5 fill-amber-400 text-amber-400"/> Review tamu (4.9/5)</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {[
                  { n:"Ayu • Jakarta", t:"Bersih banget, pool private, staf ramah. Anak suka. Pasti balik lagi!" },
                  { n:"James • Singapore", t:"Location perfect, 2 min to beach. Chef masak seafood enak." },
                ].map(r=> <div key={r.n} className="bg-slate-50 rounded-xl p-4 border"><Quote className="h-4 w-4 text-primary mb-2"/><p className="text-sm">{r.t}</p><p className="text-xs font-bold mt-2">{r.n}</p></div>)}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-bold">Kebijakan</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div className="flex gap-2"><ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0"/><span><b>Free cancel H-3</b><br/>Refund 100%</span></div>
                <div className="flex gap-2"><Calendar className="h-5 w-5 text-primary shrink-0"/><span><b>Check-in 14:00</b><br/>Checkout 12:00</span></div>
                <div className="flex gap-2"><Users className="h-5 w-5 text-primary shrink-0"/><span><b>Extra bed Rp250k</b><br/>Max {villa.maxGuests} tamu</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="sticky top-20 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border-0 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-indigo-600 text-white p-4 flex items-center justify-between">
              <p className="font-black text-xl">Rp {villa.pricePerNight.toLocaleString("id-ID")} <span className="text-xs font-normal opacity-80">/ malam</span></p>
              <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Star className="h-3 w-3 fill-primary"/> {villa.rating}</span>
            </div>
            <CardContent className="p-6 space-y-4">
              {!villa.isAvailable && <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">Full di tanggal ini, coba chat untuk waitlist prioritas.</div>}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Check-in</Label>
                  <Input type="date" defaultValue={new Date().toISOString().slice(0,10)} className="h-10 rounded-xl"/>
                </div>
                <div>
                  <Label className="text-xs font-bold">Malam</Label>
                  <Input type="number" min={1} value={nights} onChange={e=>setNights(parseInt(e.target.value)||1)} className="h-10 rounded-xl"/>
                </div>
              </div>
              <div>
                <Label className="text-xs font-bold">Tamu</Label>
                <Input type="number" min={1} max={villa.maxGuests} value={guests} onChange={e=>setGuests(parseInt(e.target.value)||1)} className="h-10 rounded-xl"/>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 space-y-2 text-sm border">
                <div className="flex justify-between"><span>{villa.pricePerNight.toLocaleString("id-ID")} x {nights} malam</span><span className="font-medium">Rp {(villa.pricePerNight*nights).toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Cleaning fee</span><span>Rp 250.000</span></div>
                <div className="flex justify-between text-emerald-600 font-medium"><span>Diskon 3 malam -10%</span><span>-Rp {(nights>=3 ? villa.pricePerNight*0.1*nights : 0).toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between font-black text-base border-t pt-2"><span>Total</span><span>Rp {total.toLocaleString("id-ID")}</span></div>
                <p className="text-[11px] text-muted-foreground text-center">Belum termasuk pajak 10% • Bayar di villa / transfer</p>
              </div>
              <Button className="w-full rounded-xl py-6 text-base font-bold shadow-lg shadow-primary/20" size="lg" asChild><a href={waLink} target="_blank">💬 Booking via WhatsApp</a></Button>
              <Button variant="outline" className="w-full rounded-xl" onClick={()=>toast.success("Permintaan terkirim! Admin balas <3 menit")}>Cek Ketersediaan</Button>
              <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1"><ShieldCheck className="h-3 w-3"/> Konfirmasi instan • Tanpa kartu kredit</p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                <span>Butuh bantu?</span><a href="tel:+6281234567890" className="font-bold text-primary">+62 812-3456-7890</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar */}
      <div className="space-y-4">
        <h3 className="font-black text-xl">Villa mirip di {villa.location}</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map(v=> <VillaCard key={v.id} id={v.id} name={v.name} location={v.location} pricePerNight={v.pricePerNight} maxGuests={v.maxGuests} bedrooms={v.bedrooms} bathrooms={v.bathrooms} image={v.image} rating={v.rating} isAvailable={v.isAvailable}/>)}
        </div>
        <div className="text-center"><Button variant="outline" asChild className="rounded-full"><Link href="/villas">Lihat semua villa di {villa.location}</Link></Button></div>
      </div>
    </div>
  );
}
