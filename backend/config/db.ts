import mongoose from "mongoose"
import { ENV } from "./env"

export async function connectDB() {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL)
        console.log("MongoDB:", conn.connection.host)
    }catch (error) {
        console.error("Error:", error)
        process.exit(1)
    }
}