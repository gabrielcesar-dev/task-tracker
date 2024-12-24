import ReactDOM from "react-dom";
import styles from "./Modal.module.css"
import { Task, useTaskStore } from "../store/task";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task
}

export function Modal({ isOpen, onClose, task }: ModalProps) {
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title ?? "",
    about: task.about ?? "",
    deadline: task.deadline ?? "",
    isCompleted: task.isCompleted ?? false
  })

  const { updateTask } = useTaskStore()

  async function handleUpdateTask() {

    const { success, message } = await updateTask(task._id, updatedTask)

    if(!success) {
        console.error(message)
        return 
    }

    onClose()
}

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <header>
                    <h1>Update Task</h1>
                    <button title={"Close"} onClick={onClose}>
                    <IoClose />
                    </button>
                </header>
                <main>
                    <div>
                        <label>Title <span>*</span></label>
                    <input
                        value={updatedTask.title}
                        placeholder={""}
                        name={"title"}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value})}
                    />
                </div>
                <div>
                        <label>About</label>
                        <input
                            value={updatedTask.about}
                            placeholder={""}
                            name={"about"}
                            onChange={(e) => setUpdatedTask({ ...updatedTask, about: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Deadline</label>
                        <input
                            value={updatedTask.deadline}
                            placeholder={""}
                            name={"deadline"}
                            onChange={(e) => setUpdatedTask({ ...updatedTask, deadline: e.target.value})}
                            type={"date"}
                        />
                    </div>
                </main>
                <footer>
                    <button title={"Update"} onClick={handleUpdateTask}>
                        Update
                    </button>
                    <button title={"Cancel"} onClick={onClose}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    </div>,
    document.body
  );
};
