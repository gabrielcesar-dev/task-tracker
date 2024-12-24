import { IoReturnDownBackSharp } from "react-icons/io5"
import styles from "./HomePage.module.css"
import { TaskItem } from "../components/TaskItem"
import { useEffect, useMemo, useState } from "react";
import { useTaskStore } from "../store/task";

export function HomePage() {
    const [newTask, setNewTask] = useState("");
    const { tasks, createTask, fetchTask } = useTaskStore()

    useEffect(() => {
        fetchTask()
    }, [fetchTask])

    const { completedTasks, incompleteTasks } = useMemo(() => {
        const completed = tasks
          .filter((task) => task.isCompleted)
          .sort(
            (a, b) =>
              new Date(b.isCompletedAt ?? 0).getTime() -
              new Date(a.isCompletedAt ?? 0).getTime()
          )
    
        const incomplete = tasks
          .filter((task) => !task.isCompleted)
          .sort(
            (a, b) =>
              new Date(b.createdAt ?? 0).getTime() -
              new Date(a.createdAt ?? 0).getTime()
          )
          .sort(
            (a, b) =>
                (a.deadline ? new Date(a.deadline).getTime() : Infinity) -
                (b.deadline ? new Date(b.deadline).getTime() : Infinity)
          )
    
        return { completedTasks: completed, incompleteTasks: incomplete };
      }, [tasks])

    async function handleCreateTask() {
        const { success, message } = await createTask(newTask)

        if(!success) {
            console.error(message)
            return 
        }

        setNewTask("")
    }

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.wrapper}>
                <header>
                    Task Tracker
                </header>
                <main>
                    <div className={styles.searchBar}>
                        <input 
                            type={"text"} 
                            placeholder={"Start writing and press enter to create task"}
                            name={"create task"}
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreateTask() }
                        />
                        <button onClick={handleCreateTask}>
                            <IoReturnDownBackSharp />
                        </button>
                    </div>
                    <div className={styles.tasks}>
                        {incompleteTasks.map((task) => <TaskItem key={task._id} task={task} />)}
                        {completedTasks.map((task) => <TaskItem key={task._id} task={task} />)}
                    </div>
                </main>
            </div>
        </div>
    )
}