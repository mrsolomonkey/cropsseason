import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db"; // <-- use the helper

// Define a type for your crop documents
export interface Crop {
  name: string;
  season: string;
  [key: string]: unknown; // allow extra fields for now
}

export async function GET() {
  try {
    const cropsCol = await getCollection<Crop>("crops");
    const crops = await cropsCol.find({}).toArray();

    return NextResponse.json({ crops });
  } catch (error) {
    console.error("GET /api/crops error:", error);
    return NextResponse.json(
      { error: "Failed to fetch crops" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: Crop = await req.json();

    // Basic validation
    if (!body.name || !body.season) {
      return NextResponse.json(
        { error: "Missing required fields: name, season" },
        { status: 400 }
      );
    }

    const cropsCol = await getCollection<Crop>("crops");
    const result = await cropsCol.insertOne(body);

    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("POST /api/crops error:", error);
    return NextResponse.json(
      { error: "Failed to insert crop" },
      { status: 500 }
    );
  }
}
