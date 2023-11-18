import { Priority } from "../enums/Priority";
import { TaskStatus } from "../enums/TaskStatus";

export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate: Date | null;
    priority: Priority;
    status: TaskStatus;
}

export class Task implements Task {
    constructor(init?: TaskFormValues){
        Object.assign(this, init);
    }
}

export class TaskFormValues {
    id?: string = undefined;
    title: string = '';
    description?: string = '';
    dueDate: Date | null = null;
    priority: Priority = Priority.Low;
    status: TaskStatus = TaskStatus.Pending;

    constructor(task?: Task){
        if(task){
            this.id = task.id;
            this.title = task.title;
            this.description = task.description;
            this.dueDate = task.dueDate;
            this.priority = task.priority;
            this.status = task.status;
        }
    }
}