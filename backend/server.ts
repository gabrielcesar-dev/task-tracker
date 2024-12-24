import express from "express"
import { connectDB } from "./config/db"
import taskRouter from "./routes/task.routes"
import authRouter from "./routes/auth.routes"
import { ENV } from "./config/env"
import { errorMidddleware } from "./middleware/error.middleware"
import cookieParser from "cookie-parser"

const PORT = ENV.PORT

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(cookieParser())

app.use("/api/auth", authRouter)

app.use("/api/tasks", taskRouter)

app.use(errorMidddleware)

app.listen(PORT, async () => {
    await connectDB()
    console.log("Server started on port:", PORT)
})