import mongoose, { Types, Document } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    about: {
        type: String
    },
    deadline: {
        type: String
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isCompletedAt: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    }
}, {
    timestamps: true
})

export type TaskType = mongoose.InferSchemaType<typeof taskSchema>

export default mongoose.model("task", taskSchema)

