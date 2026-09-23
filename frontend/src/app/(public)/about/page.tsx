import { AnimatedSection, StaggerGrid, StaggerItem } from "@/components/public/animated-section";
import { Award, Users, ShieldCheck, MapPin, Calendar, Sparkles, Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <AnimatedSection className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold"><Sparkles className="h-3 w-3"/> Sejak 2018 • Bali</div>
        <h1 className="text-4xl font-black tracking-tight">Tentang VillaNusantara</h1>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Kami kurasi villa private pool terbaik di Bali, Lombok & Jogja sejak 2018. 500+ villa verified, harga owner langsung tanpa markup OTA 15-20%. Tim lokal kami inspeksi tiap villa, foto & video real tanpa filter — tidak sesuai? <span className="font-bold text-foreground">Refund 100% H-1.</span>
        </p>
        <div className="flex gap-4">
          <div className="flex -space-x-2">{[1,2,3].map(i=> <img key={i} src={`https://i.pravatar.cc/100?img=${20+i}`} alt="" className="h-10 w-10 rounded-full border-2 border-white"/> )}</div>
          <p className="text-sm text-muted-foreground">Tim di Bali • 24/7 WA &lt;3 menit</p>
        </div>
      </AnimatedSection>

      <StaggerGrid>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Misi", desc: "Bikin liburan keluarga jadi mudah, jujur, dan berkesan. No hidden fee, foto real, harga jujur.", icon: "💎" },
            { title: "Visi", desc: "Jadi platform villa paling trusted di Indonesia dengan 10.000 villa verified di 2028.", icon: "🚀" },
            { title: "Value", desc: "Jujur, Cepat, Peduli. Support 24/7 dari tim yang tinggal di Bali, bukan bot.", icon: "🤝" },
          ].map(c=> <StaggerItem key={c.title}><div className="rounded-2xl bg-white border p-6 hover:shadow-lg hover:-translate-y-1 transition-all animate-fadeInUp"><div className="text-3xl mb-3">{c.icon}</div><h3 className="font-bold">{c.title}</h3><p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.desc}</p></div></StaggerItem>)}
        </div>
      </StaggerGrid>

      <AnimatedSection className="grid md:grid-cols-4 gap-4 text-center">
        {[
          { v: "500+", l: "Villa Verified", s:"Inspeksi foto" },
          { v: "12k+", l: "Tamu Puas", s:"4.9/5 rating" },
          { v: "6 thn", l: "Pengalaman", s:"Sejak 2018" },
          { v: "24/7", l: "Support", s:"WA 3 menit" },
        ].map(s=> <div key={s.l} className="rounded-2xl bg-slate-900 text-white p-6"><p className="text-2xl font-black">{s.v}</p><p className="text-xs font-bold tracking-widest uppercase opacity-80">{s.l}</p><p className="text-xs opacity-60">{s.s}</p></div>)}
      </AnimatedSection>

      <AnimatedSection className="space-y-4">
        <h2 className="text-2xl font-black">Timeline</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { y:"2018", t:"Mulai di Ubud", d:"3 villa, foto manual" },
            { y:"2020", t:"100 villa", d:"Selama pandemi, bantu owner" },
            { y:"2023", t:"500 villa", d:"Bali Lombok Jogja" },
            { y:"2026", t:"10k target", d:"AI pricing & virtual tour" },
          ].map(item=> <Card key={item.y} className="rounded-2xl"><CardContent className="p-5"><p className="text-primary font-black">{item.y}</p><h4 className="font-bold">{item.t}</h4><p className="text-xs text-muted-foreground">{item.d}</p></CardContent></Card>)}
        </div>
      </AnimatedSection>

      <AnimatedSection className="rounded-2xl bg-gradient-to-br from-primary to-violet-600 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div><h3 className="text-xl font-black">Mau jadi partner owner?</h3><p className="text-white/80 text-sm">Dapat booking 3x lebih banyak, foto gratis, dashboard owner.</p></div>
        <a href="/contact" className="bg-white text-primary font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform">Daftar Owner →</a>
      </AnimatedSection>
    </div>
  );
}
