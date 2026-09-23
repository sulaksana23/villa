"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-3 md:p-2 flex flex-col md:flex-row gap-3 items-stretch border border-white/20">
      <div className="flex-1 flex items-center gap-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl px-4 py-3 transition-colors group">
        <div className="h-10 w-10 rounded-full bg-white shadow-sm border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"><MapPin className="h-5 w-5 text-primary group-hover:text-white"/></div>
        <div className="flex-1">
          <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Lokasi</label>
          <Input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Bali, Lombok, Jogja" className="h-6 border-0 bg-transparent p-0 text-sm font-medium focus-visible:ring-0 shadow-none placeholder:text-slate-400" />
        </div>
      </div>
      <div className="flex-1 flex items-center gap-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl px-4 py-3 transition-colors group">
        <div className="h-10 w-10 rounded-full bg-white shadow-sm border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"><Calendar className="h-5 w-5 text-primary group-hover:text-white"/></div>
        <div className="flex-1">
          <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Tanggal</label>
          <Input type="date" defaultValue={new Date().toISOString().slice(0,10)} className="h-6 border-0 bg-transparent p-0 text-sm font-medium focus-visible:ring-0 shadow-none" />
        </div>
      </div>
      <div className="flex-1 flex items-center gap-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl px-4 py-3 transition-colors group">
        <div className="h-10 w-10 rounded-full bg-white shadow-sm border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"><Users className="h-5 w-5 text-primary group-hover:text-white"/></div>
        <div className="flex-1">
          <label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Tamu</label>
          <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="2 tamu, 1 villa" className="h-6 border-0 bg-transparent p-0 text-sm font-medium focus-visible:ring-0 shadow-none placeholder:text-slate-400" />
        </div>
      </div>
      <Button size="lg" className="h-auto py-4 px-8 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 gap-2 shrink-0" onClick={()=>router.push(`/villas?search=${encodeURIComponent(q)}&loc=${encodeURIComponent(loc)}`)}>
        <Search className="h-5 w-5"/> Cari Villa <Sparkles className="h-4 w-4 opacity-60"/>
      </Button>
    </div>
  );
}
