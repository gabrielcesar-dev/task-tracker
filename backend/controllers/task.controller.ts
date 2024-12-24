import { RequestHandler } from "express"
import { checkTaskService, createTaskService, deleteTaskService, getTasksService, updateTaskService } from "../services/task.service";
import { HttpError } from "../util/httpError";
import mongoose from "mongoose";


interface HeaderId extends Record<string, string>{
    id: string;
}

export const getTasks: RequestHandler = async (req, res, next) => {
    const userId = req?.userId

    try {
        const tasks = await getTasksService(userId)
        res.status(200).json({ success: true, message: "Task fetched successfully", data: tasks })
    } catch (error) {
        next(error)
    }
}

interface CreateTaskBody {
    title: string;
}

export const createTask: RequestHandler<unknown, unknown, CreateTaskBody, unknown> = async (req, res, next) => {
    const { title } = req.body
    const userId = new mongoose.Types.ObjectId(req?.userId)

    try {
        if (!userId) {
            throw new HttpError('User ID not found', 404)
          }

        if(!title?.trim()) {
            throw new HttpError("Task must have a Title", 400)
        }

        const task = await createTaskService({ user: userId, title })
        res.status(201).json({ success: true, message: "Task created successfully", data: task })
    } catch (error) {
        next(error)
    }
}

export interface updateTaskBody {
    title?: string;
    about?: string;
    deadline?: string;
}

export const updateTask: RequestHandler<HeaderId, unknown, updateTaskBody, unknown> = async (req, res, next) => {
    const { id } = req.params
    const { title, about, deadline } = req.body
    const userId = req?.userId

    try {
        if(!mongoose.isValidObjectId(id)) {
            throw new HttpError("Task Id not found", 404)
        } 
        else if(title && !title?.trim()) {
            throw new HttpError("Task must have a Title", 400)
        }
        const taskUpdated = await updateTaskService(id, { title, about, deadline }, userId)

        if(!taskUpdated) {
            throw new HttpError("Task not found", 404)
        }

        res.status(200).json({ success: true, message: "Task updated successfully", data: taskUpdated })
    } catch (error) {
        next(error)
    }

}

export const deleteTask: RequestHandler<HeaderId> = async (req, res, next) => {
    const { id } = req.params
    const userId = req?.userId

    try {
        if(!mongoose.isValidObjectId(id)) {
            throw new HttpError("Task Id not found", 404)
        } 

        const taskDeleted = await deleteTaskService(id, userId)

        if(!taskDeleted) {
            throw new HttpError("Task not found", 404)
        }


        res.status(200).json({ success: true, message: "Task deleted successfully", data: taskDeleted })
    } catch (error) {
        next(error)
    }
}

interface checkTaskBody {
    isCompleted: boolean;
}

export const checkTask: RequestHandler<HeaderId, unknown, checkTaskBody, unknown> = async (req, res, next) => {
    const { id } = req.params
    const { isCompleted } = req.body
    const userId = req?.userId

    try{
        if(!mongoose.isValidObjectId(id)) {
            throw new HttpError("Task Id not found", 404)
        }

        const task = await checkTaskService(id, isCompleted, userId)
        res.status(200).json({ success: true, message: "Task checked successfully", data: task })
    } catch (error) {
        next(error)
    }
}