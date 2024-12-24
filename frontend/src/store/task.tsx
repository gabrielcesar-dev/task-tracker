import axios from "axios";
import { create } from "zustand"

export interface Task {
    _id: number;
    title: string;
    about: string;
    deadline: string;
    isCompleted: boolean;
    isCompletedAt: Date;
    createdAt: Date;
    updatedAt: Date
}

export interface NewTask {
    title: string;
    about: string;
    deadline: string;
    isCompleted: boolean;
}

interface TaskStore {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    createTask: (title: string) => Promise<{ success: boolean, message: string }>;
    fetchTask: () => Promise<{ success: boolean, message: string }>;
    deleteTask: (taskId: number) => Promise<{ success: boolean, message: string }>;
    updateTask: (taskId: number, task: NewTask) => Promise<{ success: boolean, message: string }>
    patchTask: (taskId: number, isCompleted: boolean) => Promise<{ success: boolean, message: string }>;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    setTasks: (tasks) => set ({ tasks: tasks }),
    createTask: async (title) => {
        if (!title) {
            return { success: false, message: "Please fill in the field!" }
        }

        try {
            const res = await fetch("/api/tasks", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ title })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error()
            }

            if (!data.success) {
                return { success: data.success, message: data.message } 
            }
            

            set((stage) => ({
                tasks: [...stage.tasks, data.data] 
            }))

            return { success: data.success , message: data.message }
        } catch (error) {
            console.error("Error creating task:", error);
            return { success: false, message: "An unexpected error occurred." };
        }
    },
    patchTask: async (taskId, isCompleted) => {
        const isCompletedUpdated = !isCompleted

        try {
            const res = await fetch(`/api/tasks/${taskId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PATCH",
                body: JSON.stringify({ isCompleted: isCompletedUpdated }) 
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error()
            }

            if (!data.success) {
                return { success: data.success, message: data.message } 
            }

            set((stage) => ({
                tasks: stage.tasks.map(task =>
                    task._id !== taskId
                        ? task
                        : { ...task, ...data.data }
                )
            }));

            return { success: data.success, message: data.message }
        }catch (error) {
            console.error("Error creating task:", error);
            return { success: false, message: "An unexpected error occurred." };
        }
    },
    fetchTask: async () => {
        try {
            const res = await axios("api/tasks")

            set({ tasks: res.data.data })
            
            return res.data
        }catch (err) {
            if(axios.isAxiosError(err)) {
                return { success: false, message: err.response?.data?.message || err.request }
            } else {
                return { success: false, message: 'Registration failed' }
            }
        }
    },
    deleteTask: async (taskId) => {
        try {
            const res = await fetch(`api/tasks/${taskId}`,{
                method: "DELETE"
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error()
            }

            if (!data.success) {
                return { success: data.success , message: data.message }
            }

            set((stage) => ({
                tasks: stage.tasks.filter(task => task._id !== taskId)
            }))

            return { success: true, message: data.message }
        }catch (error) {
            console.error("Error creating task:", error);
            return { success: false, message: "An unexpected error occurred." };
        }
    },
    updateTask: async (taskId, newTask) => {
        if (!newTask.title) {
            return { success: false, message: "Please fill in the title!" }
        }

        try {
            const res = await fetch(`api/tasks/${taskId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(newTask)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error()
            }

            if(!data.success) {
                return { success: data.success , message: data.message }
            }

            set((stage) => ({
                tasks: stage.tasks.map(task => taskId !== task._id ? task : { ...task, ...data.data })
            }))

            return { success: data.success, message: data.message }
        }catch (error) {
            console.error("Error creating task:", error);
            return { success: false, message: "An unexpected error occurred." };
        }
    }
}))
