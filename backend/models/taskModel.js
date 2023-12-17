import mongoose from 'mongoose';

//updated title to taskName and capitalized the first letter of prioriy titles to match the values on the frontend

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    taskName: {
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
        enum: ['not started', 'in progress', 'complete', 'rolled over'],
        default: 'not started'
    },
    timer: {
        type: Number,
        default: 1
    },
    notes: String
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
