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
        enum: ['top priority', 'important', 'other']
    },
    state: {
        type: String,
        required: true,
        enum: ['not started', 'in progress', 'complete', 'rolled over'],
        default: 'not started'
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
