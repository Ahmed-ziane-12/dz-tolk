import { NextResponse } from "next/server";
import destinations from "@/data/destinations.json";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const destination = destinations.find(
    (d: { title: string }) =>
      d.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!destination) {
    return NextResponse.json(
      { error: "Destination not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(destination);
}
