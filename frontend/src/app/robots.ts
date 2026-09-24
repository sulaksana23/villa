import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://villafrontend-6jebv9q9q-sulaksana23s-projects.vercel.app/sitemap.xml",
  };
}
