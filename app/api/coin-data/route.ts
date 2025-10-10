// app/api/coin-data/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"   // <-- default import
import { ObjectId } from "mongodb"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db("mydb") // replace with your DB name
  const collection = db.collection("coinCounts")

  const data = await collection
    .find({ userId: session.user.id })
    .sort({ date: 1 })
    .toArray()

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const client = await clientPromise
  const db = client.db("mydb") // replace with your DB name
  const collection = db.collection("coinCounts")

  const newRecord = {
    userId: session.user.id,
    date: new Date(body.date),
    btcCount: body.btcCount,
    ethCount: body.ethCount,
    solCount: body.solCount,
  }

  const result = await collection.insertOne(newRecord)

  return NextResponse.json({ ...newRecord, _id: result.insertedId })
}
