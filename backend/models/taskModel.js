import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ['Top Priority', 'Important', 'Other']
    },
    state: {
        type: String,
        required: true,
        enum: ['Not Started', 'In Progress', 'Complete', 'Rolled Over'],
        default: 'Not Started'
    },
    timers: {
        type: Number,
        default: 1
    },
    notes: String
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
