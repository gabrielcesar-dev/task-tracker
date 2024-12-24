import taskModel, { TaskType } from "../models/task.model";
import { HttpError } from "../util/httpError";

export const getTasksService = async (userId?: string): Promise<TaskType[]> => {
    return await taskModel.find({ user: userId }); 
};

export const createTaskService = async ({ user, title, about, deadline, isCompleted, isCompletedAt }: Partial<TaskType>): Promise<TaskType> => {
    const newTask = new taskModel({
        title,
        about,
        deadline,
        isCompleted,
        isCompletedAt,
        user
    })

        return await newTask.save()
}

export const updateTaskService = async (taskId: string, newTask: Partial<TaskType>, userId?: string): Promise<TaskType | null> => {
    const task = await taskModel.findById(taskId)

    if (!task) {
        throw new HttpError("Task not found", 404)
    }

    if (task.user?.toString() !== userId) {
        throw new HttpError("Not authorized to update this task", 401)
    }
    

    return await taskModel.findByIdAndUpdate(taskId, newTask, { new: true })
}

export const deleteTaskService = async (taskId: string, userId?: string): Promise<TaskType | null> => {
    const task = await taskModel.findById(taskId)

    if (!task) {
        throw new HttpError("Task not found", 404)
    }

    if (task.user?.toString() !== userId) {
        throw new HttpError("Not authorized to delete this task", 401)
    } 

    return await taskModel.findByIdAndDelete(taskId)
}

export const checkTaskService = async (taskId: string, isCompleted: boolean, userId?: string): Promise<null> => {
    const task = await taskModel.findById(taskId)

    if (!task) {
        throw new HttpError("Task not found", 404)
    }

    if (task.user?.toString() !== userId) {
        throw new HttpError("Not authorized to delete this task", 401)
    } 

    const isCompletedAt = new Date()

    return await taskModel.findByIdAndUpdate(taskId, { isCompleted, isCompletedAt }, { new: true })
}
