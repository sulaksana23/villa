import { MetadataRoute } from "next";
import { mockVillas } from "@/lib/mock-villas";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://villafrontend-6jebv9q9q-sulaksana23s-projects.vercel.app";
  const villas = mockVillas.map(v => ({ url: `${base}/villas/${v.id}`, lastModified: new Date() }));
  const pages = ["", "/villas", "/about", "/contact", "/faq", "/gallery", "/blog", "/booking", "/favorites", "/admin"].map(p => ({ url: `${base}${p}`, lastModified: new Date() }));
  return [...pages, ...villas];
}
