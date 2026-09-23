"use client";
import { useState } from "react";
import { mockVillas } from "@/lib/mock-villas";
import { VillaCard } from "@/components/public/villa-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function FavoritesPage() {
  const [favs] = useState(mockVillas.slice(0,2));
  if (!favs.length) return <div className="mx-auto max-w-7xl px-4 py-16 text-center"><p className="text-muted-foreground">Belum ada favorit</p><Button asChild className="mt-4"><Link href="/villas">Jelajahi Villa</Link></Button></div>;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="text-3xl font-black">Favorit Saya</h1>
      <p className="text-muted-foreground">{favs.length} villa disimpan</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favs.map(v=> <VillaCard key={v.id} id={v.id} name={v.name} location={v.location} pricePerNight={v.pricePerNight} maxGuests={v.maxGuests} bedrooms={v.bedrooms} bathrooms={v.bathrooms} image={v.image} rating={v.rating} isAvailable={v.isAvailable}/>)}
      </div>
    </div>
  );
}
