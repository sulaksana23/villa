"use client";
import { useState, useMemo } from "react";
import { VillaCard } from "@/components/public/villa-card";
import { mockVillas } from "@/lib/mock-villas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, LayoutGrid, List, Map as MapIcon, Sparkles } from "lucide-react";

export default function VillasPage() {
  const [search, setSearch] = useState("");
  const [loc, setLoc] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("pop");
  const [view, setView] = useState<"grid"|"list">("grid");
  const [amen, setAmen] = useState("all");

  const filtered = useMemo(() => {
    let out = [...mockVillas];
    if (search) out = out.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase()));
    if (loc !== "all") out = out.filter(v => v.location.toLowerCase().includes(loc.toLowerCase()));
    if (price === "low") out = out.filter(v => v.pricePerNight < 2000000);
    if (price === "mid") out = out.filter(v => v.pricePerNight >= 2000000 && v.pricePerNight <= 4000000);
    if (price === "high") out = out.filter(v => v.pricePerNight > 4000000);
    if (amen !== "all") out = out.filter(v => v.amenities.join(" ").toLowerCase().includes(amen.toLowerCase()));
    if (sort === "price-asc") out.sort((a,b)=>a.pricePerNight-b.pricePerNight);
    if (sort === "price-desc") out.sort((a,b)=>b.pricePerNight-a.pricePerNight);
    if (sort === "rating") out.sort((a,b)=>b.rating-a.rating);
    return out;
  }, [search, loc, price, sort, amen]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Semua Villa <span className="text-primary">• 500+</span></h1>
          <p className="text-muted-foreground flex items-center gap-2"><span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"/>{filtered.length} villa ditemukan • Private pool • Verified • Free cancel</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={view==="grid" ? "default":"outline"} size="icon" onClick={()=>setView("grid")}><LayoutGrid className="h-4 w-4"/></Button>
          <Button variant={view==="list" ? "default":"outline"} size="icon" onClick={()=>setView("list")}><List className="h-4 w-4"/></Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-3 flex flex-col xl:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3 border">
          <Search className="h-4 w-4 text-muted-foreground"/>
          <Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari villa, lokasi, beachfront..." className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-10"/>
        </div>
        <Select value={loc} onValueChange={setLoc}>
          <SelectTrigger className="w-full xl:w-[160px] h-10 rounded-xl"><SelectValue placeholder="Lokasi"/></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Lokasi</SelectItem>
            <SelectItem value="bali">Bali</SelectItem>
            <SelectItem value="lombok">Lombok</SelectItem>
            <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
            <SelectItem value="ubud">Ubud</SelectItem>
          </SelectContent>
        </Select>
        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger className="w-full xl:w-[160px] h-10 rounded-xl"><SelectValue placeholder="Harga"/></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Harga</SelectItem>
            <SelectItem value="low"> &lt; Rp2jt</SelectItem>
            <SelectItem value="mid"> Rp2jt - 4jt</SelectItem>
            <SelectItem value="high"> &gt; Rp4jt</SelectItem>
          </SelectContent>
        </Select>
        <Select value={amen} onValueChange={setAmen}>
          <SelectTrigger className="w-full xl:w-[160px] h-10 rounded-xl"><SelectValue placeholder="Fasilitas"/></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Fasilitas</SelectItem>
            <SelectItem value="pool">Private Pool</SelectItem>
            <SelectItem value="chef">Chef</SelectItem>
            <SelectItem value="beach">Beach Access</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full xl:w-[160px] h-10 rounded-xl"><SelectValue placeholder="Urutkan"/></SelectTrigger>
          <SelectContent>
            <SelectItem value="pop">Populer</SelectItem>
            <SelectItem value="rating">Rating Tertinggi</SelectItem>
            <SelectItem value="price-asc">Harga Terendah</SelectItem>
            <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="rounded-xl" onClick={()=>{setSearch("");setLoc("all");setPrice("all");setSort("pop");setAmen("all")}}><SlidersHorizontal className="h-4 w-4 mr-2"/>Reset</Button>
      </div>

      <div className="flex gap-2 overflow-auto pb-1">
        {[
          { k:"all", l:"Semua" },
          { k:"bali", l:"Bali" },
          { k:"pool", l:"Private Pool" },
          { k:"chef", l:"Dengan Chef" },
          { k:"beach", l:"Beachfront" },
        ].map(f=> <Badge key={f.k} variant={ (loc===f.k||amen===f.k) ? "default":"secondary"} className="cursor-pointer rounded-full px-3 py-1.5" onClick={()=>{if(f.k==="bali") setLoc("bali"); else if(f.k==="pool") setAmen("pool"); else {setLoc("all");setAmen("all")}}}>{f.l}</Badge>)}
        <span className="text-xs text-muted-foreground flex items-center gap-1 ml-2"><Sparkles className="h-3 w-3"/> 12 villa promo minggu ini</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {filtered.length===0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <p className="text-muted-foreground">Tidak ada villa sesuai filter.</p>
              <Button variant="outline" className="mt-4" onClick={()=>{setSearch("");setLoc("all");setPrice("all")}}>Reset Filter</Button>
            </div>
          ) : (
            <div className={view==="grid" ? "grid gap-6 sm:grid-cols-2" : "grid gap-4"}>
              {filtered.map(v=> <VillaCard key={v.id} id={v.id} name={v.name} location={v.location} pricePerNight={v.pricePerNight} maxGuests={v.maxGuests} bedrooms={v.bedrooms} bathrooms={v.bathrooms} image={v.image} rating={v.rating} isAvailable={v.isAvailable} />)}
            </div>
          )}
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl overflow-hidden border bg-white shadow-sm">
            <div className="p-4 border-b flex items-center justify-between"><h4 className="font-bold flex items-center gap-2"><MapIcon className="h-4 w-4 text-primary"/> Peta Villa</h4><span className="text-xs bg-primary text-white px-2 py-1 rounded-full">{filtered.length} villa</span></div>
            <div className="h-[520px] bg-slate-100 relative flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1526772661823-3f88f33771cd?w=600" alt="map" className="absolute inset-0 h-full w-full object-cover opacity-50" />
              <div className="relative bg-white rounded-full px-4 py-2 shadow-lg border text-sm font-bold">🗺️ Map interaktif segera</div>
            </div>
            <div className="p-4 text-xs text-muted-foreground">Klik villa untuk lihat lokasi detail & jarak ke pantai/ubud.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
