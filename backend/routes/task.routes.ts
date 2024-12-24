import express from "express"
import { createTask, deleteTask, getTasks, checkTask, updateTask } from "../controllers/task.controller"
import { authenticate } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/", authenticate, getTasks)
router.post("/", authenticate, createTask)
router.put("/:id", authenticate, updateTask)
router.delete("/:id", authenticate, deleteTask)
router.patch("/:id", authenticate, checkTask)

export default router
