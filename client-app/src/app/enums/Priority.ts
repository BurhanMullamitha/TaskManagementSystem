export enum Priority {
    Low = 1,
    Medium = 2,
    High = 3
}

export const PriorityLabels = {
    [Priority.Low]: 'Low',
    [Priority.Medium]: 'Medium',
    [Priority.High]: 'High',
};

export const PriorityOptions = Object.entries(Priority)
.filter(([key, value]) => typeof value === 'number')
.map(([key, value]) => ({
    value: value,
    text: PriorityLabels[value as Priority] 
}));