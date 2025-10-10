// models/CoinCount.ts
import mongoose, { Schema, models } from "mongoose"

const CoinCountSchema = new Schema({
  userId: { type: String, required: true }, // link to logged-in user
  date: { type: Date, required: true },
  btcCount: Number,
  ethCount: Number,
  solCount: Number,
})

export default models.CoinCount || mongoose.model("CoinCount", CoinCountSchema)
