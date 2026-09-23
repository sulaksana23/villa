import { mockVillas, MockVilla } from "./mock-villas";
import { apiFetch } from "./api";

export async function getPublicVillas(params?: { search?: string; loc?: string }): Promise<MockVilla[]> {
  try {
    const data = await apiFetch<{ data: any[] }>("/villas/public", { params: params as any });
    if (Array.isArray(data.data) && data.data.length) {
      return data.data.map((v: any) => ({
        id: v.id,
        name: v.name,
        location: v.location || "Bali",
        pricePerNight: Number(v.pricePerNight || v.price_per_night || 2500000),
        maxGuests: v.maxGuests || 4,
        bedrooms: v.bedrooms || 2,
        bathrooms: v.bathrooms || 2,
        rating: 4.8,
        image: v.images?.[0]?.imagePath || mockVillas[0].image,
        images: v.images?.map((i: any) => i.imagePath) || mockVillas[0].images,
        amenities: v.facilities?.map((f: any) => f.name) || ["Private Pool", "WiFi"],
        description: v.description || "Villa premium verified",
        isAvailable: v.isAvailable ?? true,
      }));
    }
  } catch {}
  // fallback mock with filter
  let out = [...mockVillas];
  if (params?.search) out = out.filter(v => v.name.toLowerCase().includes(params.search!.toLowerCase()));
  if (params?.loc && params.loc !== "all") out = out.filter(v => v.location.toLowerCase().includes(params.loc!.toLowerCase()));
  return out;
}

export async function getPublicVillaById(id: string | number): Promise<MockVilla | undefined> {
  try {
    const data = await apiFetch<{ data: any }>(`/villas/public/${id}`);
    if (data.data) {
      const v = data.data;
      return {
        id: v.id,
        name: v.name,
        location: v.location || "Bali",
        pricePerNight: Number(v.pricePerNight || 2500000),
        maxGuests: v.maxGuests || 4,
        bedrooms: v.bedrooms || 2,
        bathrooms: v.bathrooms || 2,
        rating: 4.8,
        image: v.images?.[0]?.imagePath || mockVillas[0].image,
        images: v.images?.map((i: any) => i.imagePath) || mockVillas[0].images,
        amenities: v.facilities?.map((f: any) => f.name) || ["Private Pool"],
        description: v.description || "",
        isAvailable: v.isAvailable ?? true,
      };
    }
  } catch {}
  return mockVillas.find(v => String(v.id) === String(id));
}
