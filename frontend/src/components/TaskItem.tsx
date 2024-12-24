
import { GoCheck } from "react-icons/go"
import styles from "./Task.module.css"
import { PiNoteDuotone } from "react-icons/pi"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import { Task, useTaskStore } from "../store/task"
import { Modal } from "./Modal"
import { useState } from "react"
import { dateFormatter } from "../utils/dateFormater"

interface TaskProps {
    task: Task
}

export function TaskItem({ task }: TaskProps) {
    const { patchTask, deleteTask } = useTaskStore()
    const [isModalOpen, setIsModalOpen] = useState(false)

    async function handleDeleteTask() {
        const { success, message } =  await deleteTask(task._id)

        if(!success) {
            console.error(message)
        }
    }

    async function handlePatchTask() {
        const { success, message } = await patchTask(task._id, task.isCompleted)

        if(!success) {
            console.error(message)
        }
    }

    return (
        <div className={`${styles.wrapper} + ${task.isCompleted ? styles.completed : "" }`}>
            <div className={styles.checkbox}>
                <input 
                    type={"checkbox"} 
                    checked={task.isCompleted}
                    onChange={handlePatchTask}
                />
                <GoCheck className={styles.checkIcon} />
            </div>

            <div className={styles.content}>
                <p title={task.about} className={ task.isCompleted ? styles.strikeThrough : "" }>{task.title}</p>
                <time title={task.deadline} dateTime={task.deadline} className={ task.isCompleted ? styles.completed : "" }>
                    {task.deadline && "Due " + dateFormatter(task.deadline)}
                </time>
                {task.about && <PiNoteDuotone className={styles.noteIcon} /> }
            </div>
            
            <div className={styles.buttons}>
                <button title={"edit"} onClick={() => setIsModalOpen(true)}>
                    <FaEdit />
                </button>
                <button title={"delete"} onClick={handleDeleteTask}>
                    <RiDeleteBin5Fill />
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} task={ task }/>
        </div>
    )
}