import { mockVillas } from "@/lib/mock-villas";
export default function GalleryPage() {
  const imgs = mockVillas.flatMap(v=> v.images).slice(0,12);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div><h1 className="text-3xl font-black">Gallery</h1><p className="text-muted-foreground">Foto real dari 500+ villa verified — tanpa filter</p></div>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {imgs.map((src,i)=> <img key={i} src={src} alt={`gallery ${i}`} className="rounded-2xl w-full object-cover break-inside-avoid" />)}
      </div>
    </div>
  );
}
