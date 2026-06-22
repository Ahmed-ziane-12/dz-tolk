import { NextResponse } from "next/server";
import destinations from "@/data/destinations.json";

export async function GET() {
  return NextResponse.json(destinations);
}
