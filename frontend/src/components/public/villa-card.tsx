"use client";
import Link from "next/link";
import { MapPin, Users, BedDouble, Bath, Star, Heart, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type VillaCardProps = {
  id: number | string;
  name: string;
  location: string;
  pricePerNight: number | string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  rating?: number;
  reviews?: number;
  isAvailable?: boolean;
  isFav?: boolean;
};

export function VillaCard({ id, name, location, pricePerNight, maxGuests, bedrooms, bathrooms, image, rating = 4.9, reviews = 128, isAvailable = true }: VillaCardProps) {
  const price = typeof pricePerNight === "string" ? parseFloat(pricePerNight) : pricePerNight;
  return (
    <Link href={`/villas/${id}`} className="block group animate-fadeInUp">
      <Card className="overflow-hidden border-0 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1.5 rounded-2xl hover:scale-[1.01]">
        <div className="relative h-60 overflow-hidden">
          <img src={image} alt={name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex gap-2">
            {isAvailable ? <Badge className="bg-emerald-500 hover:bg-emerald-600 shadow-lg backdrop-blur text-white border-0">● Tersedia</Badge> : <Badge variant="destructive" className="shadow">Full Booked</Badge>}
            <Badge variant="secondary" className="bg-white/95 text-slate-900 backdrop-blur shadow gap-1 font-semibold"><Star className="h-3 w-3 fill-amber-400 text-amber-400"/>{rating} <span className="font-normal text-muted-foreground">({reviews})</span></Badge>
          </div>
          <Button size="icon" variant="secondary" className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow hover:bg-white opacity-0 group-hover:opacity-100 transition-all" onClick={(e)=>{e.preventDefault();}}>
            <Heart className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 translate-y-1 group-hover:translate-y-0 transition-transform">
            <p className="text-white text-sm flex items-center gap-1.5 font-medium drop-shadow"><MapPin className="h-3.5 w-3.5 text-white/80"/>{location}</p>
            <p className="text-white/80 text-xs flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="h-3 w-3"/> Lihat gallery • Virtual tour</p>
          </div>
        </div>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-bold line-clamp-1 group-hover:text-primary transition-colors leading-tight">{name}</h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground bg-slate-50 rounded-full px-3 py-1.5 w-fit">
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5"/>{maxGuests} tamu</span>
            <span className="w-px h-3 bg-slate-200"/>
            <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5"/>{bedrooms} BR</span>
            <span className="w-px h-3 bg-slate-200"/>
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5"/>{bathrooms} BA</span>
          </div>
          <div className="flex items-end justify-between pt-1">
            <div>
              <p className="text-[11px] tracking-widest uppercase text-muted-foreground font-semibold">Mulai dari</p>
              <p className="font-black text-[17px] text-primary leading-none">Rp {price.toLocaleString("id-ID")} <span className="text-[11px] font-medium text-muted-foreground">/ malam</span></p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Free cancel • Bayar di villa</p>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">Detail →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
