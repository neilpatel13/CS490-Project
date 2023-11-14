import Task from '../models/taskModel.js';

const rolloverTasks = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const tasks = await Task.find({
        date: { $lt: yesterday },
        state: { $ne: 'complete' }
    });

    tasks.forEach(async (task) => {
        task.state = 'rolled over';
        await task.save();
    });
};

export { rolloverTasks };
