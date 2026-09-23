export type MockVilla = {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  isAvailable: boolean;
};

export const mockVillas: MockVilla[] = [
  {
    id: 1,
    name: "Villa Ubud Jungle Paradise",
    location: "Ubud, Bali",
    pricePerNight: 2500000,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    ],
    amenities: ["Private Pool", "Chef", "Spa", "WiFi", "Kitchen", "BBQ"],
    description: "Villa mewah di jantung Ubud dengan view sawah yang menakjubkan. Private infinity pool, 3 kamar dengan ensuite bathroom, dapur lengkap dan layanan chef pribadi.",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Villa Seminyak Beachfront",
    location: "Seminyak, Bali",
    pricePerNight: 4200000,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200",
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    amenities: ["Beach Access", "Private Pool", "Bar", "Gym", "Cinema"],
    description: "Hanya 30 detik jalan ke pantai Seminyak. Villa modern 4BR dengan rooftop bar, private beach access dan sunset view terbaik.",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Villa Canggu Surf Retreat",
    location: "Canggu, Bali",
    pricePerNight: 1800000,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b597?w=800",
    ],
    amenities: ["Pool", "Surf Board", "Yoga Deck", "Co-working"],
    description: "Surfer's paradise di Canggu. Dekat Echo Beach, yoga deck, pool dan desain tropical minimalis untuk work & surf.",
    isAvailable: false,
  },
  {
    id: 4,
    name: "Villa Lombok Cliff Haven",
    location: "Senggigi, Lombok",
    pricePerNight: 3100000,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    ],
    amenities: ["Cliff View", "Infinity Pool", "Private Beach", "Chef"],
    description: "Di atas tebing Lombok dengan view laut lepas. Sunset spektakuler, akses private beach, infinity pool 15m.",
    isAvailable: true,
  },
  {
    id: 5,
    name: "Villa Jogja Heritage",
    location: "Kaliurang, Yogyakarta",
    pricePerNight: 1500000,
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    ],
    amenities: ["Mountain View", "Joglo Hall", "Pool", "Karaoke"],
    description: "Joglo heritage dengan 5 kamar untuk keluarga besar. View Gunung Merapi, pendopo luas, cocok untuk gathering.",
    isAvailable: true,
  },
  {
    id: 6,
    name: "Villa Uluwatu Ocean Deck",
    location: "Uluwatu, Bali",
    pricePerNight: 5500000,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    ],
    amenities: ["Ocean View", "Infinity Pool", "Butler", "Helipad"],
    description: "Ultra luxury di tebing Uluwatu. Butler 24 jam, ocean view 270°, infinity pool menghadap Samudra Hindia.",
    isAvailable: true,
  },
];
