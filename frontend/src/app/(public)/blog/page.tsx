import { AnimatedSection, StaggerGrid, StaggerItem } from "@/components/public/animated-section";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
const posts = [
  { id:1, title:"7 Villa Private Pool Terbaik di Bali 2026", excerpt:"Kurasi villa dengan pool 12m, view sawah dan sunset. Harga jujur mulai 1.8jt.", date:"2026-09-20", img:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" },
  { id:2, title:"Itinerary 4 Hari Ubud - Sidemen", excerpt:"Hari 1 jungle, hari 2 rice terrace, hari 3 spa, hari 4 sunrise Agung.", date:"2026-09-15", img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800" },
  { id:3, title:"Tips Booking Villa Anti Zonk", excerpt:"Cek foto real, video walkthrough, dan refund policy sebelum DP.", date:"2026-09-10", img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800" },
  { id:4, title:"Gili T vs Nusa Penida: Mana Lebih Worth?", excerpt:"Beachfront Gili untuk snorkeling, cliff Penida untuk sunset.", date:"2026-09-05", img:"https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800" },
  { id:5, title:"Jogja Heritage: 5 Villa Joglo untuk Keluarga Besar", excerpt:"Magelang view Borobudur, Kaliurang view Merapi, semua 4-5BR.", date:"2026-09-01", img:"https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800" },
  { id:6, title:"Harga Villa Bali Naik? Ini Penyebab & Solusi", excerpt:"High season Juli-Agustus naik 20%, booking H-60 dapat early bird -10%.", date:"2026-08-28", img:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800" },
];
export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <AnimatedSection className="max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold"><Sparkles className="h-3 w-3"/> Blog & Tips</div>
        <h1 className="text-3xl font-black mt-2">Blog VillaNusantara</h1><p className="text-muted-foreground">Tips, itinerary, dan kurasi villa terbaru — update tiap minggu.</p>
      </AnimatedSection>
      <StaggerGrid>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(p=> <StaggerItem key={p.id}><Card className="overflow-hidden rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all"><img src={p.img} alt={p.title} className="h-48 w-full object-cover"/><CardContent className="p-5 space-y-2"><p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3"/>{p.date}</p><h3 className="font-bold line-clamp-2">{p.title}</h3><p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p><Link href={`/blog`} className="text-sm font-bold text-primary flex items-center gap-1">Baca <ArrowRight className="h-3 w-3"/></Link></CardContent></Card></StaggerItem>)}
        </div>
      </StaggerGrid>
    </div>
  );
}
