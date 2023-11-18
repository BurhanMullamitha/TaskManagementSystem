export enum TaskStatus {
    Pending = 1,
    InProgress = 2,
    Completed = 3,
    Archived = 4
}

export const TaskStatusLabels = {
    [TaskStatus.Pending]: 'Pending',
    [TaskStatus.InProgress]: 'In Progress',
    [TaskStatus.Completed]: 'Completed',
    [TaskStatus.Archived]: 'Archived'
};

export const TaskStatusOptions = Object.entries(TaskStatus)
.filter(([key, value]) => typeof value === 'number')
.map(([key, value]) => ({
    value: value,
    text: TaskStatusLabels[value as TaskStatus] 
}));