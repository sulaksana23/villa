"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { mockVillas } from "@/lib/mock-villas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Users, CreditCard, ShieldCheck, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function BookingPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const villaId = sp.get("villa") || "1";
  const villa = mockVillas.find(v => String(v.id) === villaId) || mockVillas[0];
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", wa: "", email: "", nights: 2, guests: 2, date: new Date().toISOString().slice(0,10) });
  const total = villa.pricePerNight * form.nights + 250000;
  const discount = form.nights >= 3 ? villa.pricePerNight * 0.1 * form.nights : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Button variant="ghost" onClick={()=>router.back()} className="gap-2"><ArrowLeft className="h-4 w-4"/> Kembali</Button>
      <div className="flex items-center gap-2 text-xs">
        {[1,2,3].map(s=> <div key={s} className={`flex items-center gap-2 ${s<=step ? "text-primary":"text-muted-foreground"}`}><span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border ${s<=step ? "bg-primary text-white border-primary":"bg-white"}`}>{s<step ? <Check className="h-4 w-4"/> : s}</span>{s<3 && <span className="w-8 h-px bg-slate-200 hidden sm:block"/>}</div>)}
        <span className="ml-2 text-xs text-muted-foreground">Step {step}/3 • {["Data Tamu","Pembayaran","Konfirmasi"][step-1]}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {step===1 && (
            <Card className="rounded-2xl">
              <CardHeader><CardTitle>Data Tamu</CardTitle><p className="text-sm text-muted-foreground">Isi data untuk booking {villa.name}</p></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Nama Lengkap</Label><Input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Ayu Wulandari"/></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>WhatsApp</Label><Input value={form.wa} onChange={e=>setForm({...form,wa:e.target.value})} placeholder="0812..."/></div>
                  <div><Label>Email</Label><Input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="ayu@email.com"/></div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><Label>Check-in</Label><Input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
                  <div><Label>Malam</Label><Input type="number" min={1} value={form.nights} onChange={e=>setForm({...form,nights: parseInt(e.target.value)||1})}/></div>
                  <div><Label>Tamu</Label><Input type="number" min={1} max={villa.maxGuests} value={form.guests} onChange={e=>setForm({...form,guests: parseInt(e.target.value)||1})}/></div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs flex gap-2"><Sparkles className="h-4 w-4 text-amber-600 shrink-0"/> Booking 3 malam dapat diskon 10% + free BBQ</div>
                <Button className="w-full rounded-xl py-6 font-bold" onClick={()=>{if(!form.name||!form.wa) return toast.error("Lengkapi nama & WA"); setStep(2)}}>Lanjut ke Pembayaran →</Button>
              </CardContent>
            </Card>
          )}
          {step===2 && (
            <Card className="rounded-2xl">
              <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary"/> Pembayaran</CardTitle><p className="text-sm text-muted-foreground">Pilih metode, bayar DP 10% atau full</p></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {[
                    { id:"transfer", l:"Transfer Bank", d:"BCA/Mandiri • Konfirmasi instan", rec:true },
                    { id:"wa", l:"Bayar via WhatsApp", d:"Admin kirim invoice • DP 10%" },
                    { id:"cod", l:"Bayar di Villa", d:"Khusus repeat tamu" },
                  ].map(m=> <label key={m.id} className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"><input type="radio" name="pay" defaultChecked={m.rec} className="h-4 w-4"/><div className="flex-1"><p className="font-bold text-sm">{m.l} {m.rec && <Badge className="ml-2">Recommended</Badge>}</p><p className="text-xs text-muted-foreground">{m.d}</p></div></label>)}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={()=>setStep(1)}>Kembali</Button>
                  <Button className="flex-1" onClick={()=>setStep(3)}>Bayar DP 10% • Rp {(total*0.1).toLocaleString("id-ID")}</Button>
                </div>
                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1"><ShieldCheck className="h-3 w-3"/> Aman • Refund 100% H-3</p>
              </CardContent>
            </Card>
          )}
          {step===3 && (
            <Card className="rounded-2xl border-emerald-200 bg-emerald-50/50">
              <CardContent className="p-8 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto"><Check className="h-8 w-8"/></div>
                <h3 className="text-xl font-black">Booking Berhasil! 🎉</h3>
                <p className="text-sm text-muted-foreground">Invoice dikirim ke WA {form.wa} & email {form.email}. Admin balas &lt;3 menit.</p>
                <div className="bg-white rounded-xl p-4 text-left text-sm border space-y-1">
                  <p><b>Villa:</b> {villa.name}</p>
                  <p><b>Tanggal:</b> {form.date} • {form.nights} malam • {form.guests} tamu</p>
                  <p><b>Total:</b> Rp {total.toLocaleString("id-ID")} {discount>0 && <span className="text-emerald-600"> (diskon -Rp {discount.toLocaleString("id-ID")})</span>}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={()=>router.push("/villas")}>Lihat Villa Lain</Button>
                  <Button className="flex-1" onClick={()=>window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(`Booking ${villa.name} ${form.date} ${form.nights}mlm`)}`, "_blank")}>Chat Admin</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div>
          <Card className="sticky top-20 rounded-2xl overflow-hidden">
            <img src={villa.image} alt={villa.name} className="h-40 w-full object-cover" />
            <CardContent className="p-4 space-y-3">
              <h4 className="font-bold">{villa.name}</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3"/>{form.date} • {form.nights} malam • {form.guests} tamu</p>
              <div className="flex gap-2 text-xs"><Badge variant="secondary" className="gap-1"><Users className="h-3 w-3"/>{villa.maxGuests} tamu</Badge><Badge variant="secondary">{villa.bedrooms}BR</Badge></div>
              <div className="bg-slate-50 rounded-xl p-3 text-sm space-y-1 border">
                <div className="flex justify-between"><span>{villa.pricePerNight.toLocaleString("id-ID")} x {form.nights}</span><span>Rp {(villa.pricePerNight*form.nights).toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Cleaning</span><span>Rp 250.000</span></div>
                {discount>0 && <div className="flex justify-between text-emerald-600"><span>Diskon 10%</span><span>-Rp {discount.toLocaleString("id-ID")}</span></div>}
                <div className="flex justify-between font-black border-t pt-2"><span>Total</span><span>Rp {total.toLocaleString("id-ID")}</span></div>
              </div>
              <p className="text-xs text-muted-foreground text-center">Butuh bantu? WA 0812-3456-7890</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
