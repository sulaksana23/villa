import { Card, CardContent } from "@/components/ui/card";
export default function FAQPage() {
  const faqs = [
    { q: "Bagaimana cara booking?", a: "Pilih villa → cek tanggal → isi data tamu → bayar DP 10% via transfer/WA. Konfirmasi instan <3 menit." },
    { q: "Apakah bisa cancel?", a: "Free cancel H-3 refund 100%. H-2 50% refund. H-1 tidak refund tapi bisa reschedule." },
    { q: "Harga sudah termasuk apa?", a: "Sudah termasuk private pool, WiFi, cleaning. Belum termasuk chef, extra bed, pajak 10% jika invoice." },
    { q: "Check-in/out jam berapa?", a: "Check-in 14:00, checkout 12:00. Early check-in / late checkout free jika villa kosong." },
    { q: "Apakah foto asli?", a: "100% foto real dari tim inspeksi. Tidak sesuai? Refund 100% atau ganti villa seharga sama." },
    { q: "Bayar bisa di villa?", a: "Bisa untuk tamu repeat. Tamu baru minimal DP 10% untuk lock tanggal." },
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div><h1 className="text-3xl font-black">FAQ</h1><p className="text-muted-foreground">Jawaban cepat untuk 90% pertanyaan tamu</p></div>
      <div className="grid gap-4">
        {faqs.map(f=> <Card key={f.q} className="rounded-2xl"><CardContent className="p-5"><h4 className="font-bold">{f.q}</h4><p className="text-sm text-muted-foreground mt-2">{f.a}</p></CardContent></Card>)}
      </div>
      <Card className="rounded-2xl bg-primary text-white border-0"><CardContent className="p-6"><h4 className="font-bold">Masih bingung?</h4><p className="text-sm opacity-80">Chat WA 0812-3456-7890 • Balas &lt;3 menit 08:00-22:00 WITA</p></CardContent></Card>
    </div>
  );
}
