import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/public/search-bar";
import { VillaCard } from "@/components/public/villa-card";
import { AnimatedSection, StaggerGrid, StaggerItem } from "@/components/public/animated-section";
import { mockVillas } from "@/lib/mock-villas";
import { Star, ShieldCheck, Award, Users, ArrowRight, Play, Quote, MapPin, Calendar, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "VillaNusantara • Villa Private Pool Bali Lombok Jogja" };

export default function PublicHome() {
  const featured = mockVillas.slice(0, 6);
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600" alt="hero" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs backdrop-blur border border-white/20 shadow animate-fadeIn">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /><Star className="h-3 w-3 fill-amber-400 text-amber-400"/> Trusted by 12.000+ tamu • 4.9/5 di Google
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tight animate-fadeInUp">
                Liburan Mewah,<br />
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">Harga Jujur.</span>
              </h1>
              <p className="text-lg text-slate-200 max-w-xl leading-relaxed animate-fadeInUp animate-delay-100">
                Kurasi 100+ villa private pool di Bali, Lombok & Jogja. Foto real, harga owner langsung, konfirmasi <span className="text-white font-semibold">instan &lt;3 menit</span> via WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3 animate-fadeInUp animate-delay-200">
                <Button size="lg" asChild className="rounded-full px-8 py-6 text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"><Link href="/villas">Jelajahi 500+ Villa <ArrowRight className="ml-2 h-4 w-4"/></Link></Button>
                <Button size="lg" variant="outline" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900 backdrop-blur py-6 hover:scale-105 transition-transform">
                  <Play className="h-4 w-4 mr-2 fill-white"/> Lihat Video 30s
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm animate-fadeInUp animate-delay-300">
                <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-400"/> Free Cancel H-3</span>
                <span className="flex items-center gap-2"><Award className="h-5 w-5 text-amber-400"/> Verified 100%</span>
                <span className="flex items-center gap-2"><Users className="h-5 w-5 text-sky-400"/> Butler 24/7</span>
              </div>
              <div className="flex items-center gap-3 pt-2 animate-fadeInUp animate-delay-400">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i=> <img key={i} src={`https://i.pravatar.cc/100?img=${10+i}`} alt="" className="h-8 w-8 rounded-full border-2 border-white" />)}
                </div>
                <p className="text-xs text-slate-300"><span className="text-white font-bold">2.4k+</span> booking bulan ini • <span className="underline">Lihat review</span></p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3} className="hidden lg:block relative">
              <div className="bg-white rounded-[24px] p-3 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 animate-float">
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" alt="villa" className="rounded-2xl h-72 w-full object-cover" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between"><h4 className="font-bold">Villa Ubud Jungle</h4><span className="text-primary font-black">Rp 2.5jt<span className="text-xs font-normal">/mlm</span></span></div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3"/> Ubud • 3BR • Private Pool</p>
                  <div className="flex gap-2"><span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-medium">Available today</span><span className="text-xs bg-slate-50 px-2 py-1 rounded-full flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400"/>4.9 (128)</span></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border flex items-center gap-3 animate-fadeInUp">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center"><Calendar className="h-5 w-5 text-emerald-600"/></div>
                <div><p className="text-xs text-muted-foreground">Booking terakhir</p><p className="text-sm font-bold">2 menit lalu • Seminyak</p></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        <AnimatedSection delay={0.5} className="relative -mb-8 px-4">
          <SearchBar />
        </AnimatedSection>
      </section>

      {/* TRUST */}
      <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
          { v: "500+", l: "Villa Terkurasi", s: "Foto real" },
          { v: "4.9/5", l: "Rating Tamu", s: "2.4k review" },
          { v: "12k+", l: "Booking Sukses", s: "Sejak 2018" },
          { v: "24/7", l: "Customer Care", s: "WA 3 menit" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-white p-6 shadow-sm border hover:shadow-md transition-shadow">
            <p className="text-2xl font-black text-primary">{s.v}</p>
            <p className="text-xs font-bold tracking-widest uppercase">{s.l}</p>
            <p className="text-xs text-muted-foreground">{s.s}</p>
          </div>
        ))}
      </AnimatedSection>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-3 overflow-auto pb-2 scrollbar-none">
          {[
            { l: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300" },
            { l: "Lombok", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=300" },
            { l: "Jogja", img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=300" },
            { l: "Beachfront", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=300" },
            { l: "Ubud Jungle", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300" },
            { l: "Family", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300" },
          ].map(c=> (
            <Link key={c.l} href={`/villas?loc=${c.l.toLowerCase()}`} className="shrink-0 group">
              <div className="h-24 w-32 rounded-2xl overflow-hidden relative">
                <img src={c.img} alt={c.l} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm drop-shadow">{c.l}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase"><Sparkles className="h-4 w-4"/> Pilihan Minggu Ini</div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Villa Paling Laris</h2>
            <p className="text-muted-foreground">Paling sering di-booking • Update tiap jam</p>
          </div>
          <Button variant="outline" asChild className="hidden md:inline-flex rounded-full"><Link href="/villas">Lihat Semua 500+ <ChevronRight className="ml-1 h-4 w-4"/></Link></Button>
        </div>
        <StaggerGrid>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <StaggerItem key={v.id}><VillaCard id={v.id} name={v.name} location={v.location} pricePerNight={v.pricePerNight} maxGuests={v.maxGuests} bedrooms={v.bedrooms} bathrooms={v.bathrooms} image={v.image} rating={v.rating} isAvailable={v.isAvailable} /></StaggerItem>
            ))}
          </div>
        </StaggerGrid>
        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild className="rounded-full"><Link href="/villas">Lihat Semua Villa</Link></Button>
        </div>
      </AnimatedSection>

      {/* TESTIMONIALS */}
      <AnimatedSection className="bg-white border-y py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-center">Apa kata 12.000+ tamu</h2>
          <p className="text-center text-muted-foreground text-sm">Rating 4.9/5 dari Google & Airbnb</p>
          <StaggerGrid>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { n: "Ayu • Jakarta", t: "Villa Ubud super bersih, pool private, chef masak enak. Booking via WA 2 menit jadi. Worth it!", r: 5 },
                { n: "James • SG", t: "Seminyak Beachfront 30 detik ke pantai. Sunset gila. Service butler 24 jam mantap.", r: 5 },
                { n: "Rina • Surabaya", t: "Jogja Heritage 5 kamar buat keluarga besar. Joglo luas, anak senang. Harga jujur.", r: 5 },
              ].map(q=> (
                <StaggerItem key={q.n}><div className="rounded-2xl bg-slate-50 p-5 border hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                  <div className="flex text-amber-400 mb-2">{Array.from({length:q.r}).map((_,i)=> <Star key={i} className="h-4 w-4 fill-amber-400"/> )}</div>
                  <p className="text-sm leading-relaxed flex gap-2"><Quote className="h-4 w-4 text-primary shrink-0"/> {q.t}</p>
                  <p className="text-xs font-bold mt-3">{q.n}</p>
                </div></StaggerItem>
              ))}
            </div>
          </StaggerGrid>
        </div>
      </AnimatedSection>

      {/* WHY */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { t: "Harga Owner Langsung", d: "Tanpa markup OTA 15-20%. Bayar langsung ke owner, invoice resmi.", i: "💎" },
            { t: "Villa Verified 100%", d: "Tim inspeksi foto, video, fasilitas. Tidak sesuai? Refund 100% H-1.", i: "✅" },
            { t: "Support Lokal 24/7", d: "Driver, butler, chef standby. WA dibalas <3 menit.", i: "🤝" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl bg-white p-6 border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{c.i}</div>
              <h3 className="font-bold">{c.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-primary via-indigo-600 to-violet-600 p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-2xl" />
          <div className="relative max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs border border-white/20"><Sparkles className="h-3 w-3"/> Promo Oktober</div>
            <h2 className="text-3xl font-black leading-tight">Siap liburan? Booking hari ini gratis late checkout + BBQ</h2>
            <p className="text-white/80">Untuk booking 3 malam. Berlaku untuk 50 booking pertama bulan ini.</p>
            <Button variant="secondary" size="lg" asChild className="rounded-full font-bold"><Link href="/villas">Cek Ketersediaan Sekarang →</Link></Button>
            <p className="text-xs text-white/60">* Tanpa kartu kredit • Konfirmasi instan</p>
          </div>
        </div>
      </section>
    </div>
  );
}
