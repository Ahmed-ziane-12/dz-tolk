export interface NearbyGem {
  name: string;
  slug: string;
  desc: string;
}

export interface Destination {
  id: number;
  title: string;
  title_ar: string;
  lat: number;
  lng: number;
  description: string;
  description_ar: string;
  cover: string;
  rating: number;
  category: string;
  category_ar: string;
  region: string;
  region_ar: string;
  temp: string;
  distance: string;
  history: string[];
  history_ar: string[];
  nearbyGems: NearbyGem[];
}

export async function fetchDestinations(): Promise<Destination[]> {
  const res = await fetch("/api/destinations");
  if (!res.ok) throw new Error("Failed to fetch destinations");
  return res.json();
}

export async function fetchDestination(
  slug: string
): Promise<Destination | null> {
  const res = await fetch(`/api/destinations/${slug}`);
  if (!res.ok) return null;
  return res.json();
}
