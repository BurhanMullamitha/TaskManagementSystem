import { Task, TaskFormValues } from "../models/task";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { TaskStatusLabels } from "../enums/TaskStatus";

export default class TaskStore {
    tasks: Task[] = [];
    selectedTask: Task | undefined = undefined;
    loading = false;
    loadingInitial = false;
    statusCounts: any = {};
    predicate = new Map();
    priority: number = -3;
    status: number = -3;

    constructor(){
        makeAutoObservable(this);
    }

    loadTasks = async() => {
        this.setLoadingInitial(true);
        try {
            const tasks = await agent.Tasks.list();
            tasks.forEach(task => {
                task.dueDate = new Date(task.dueDate!);
                this.tasks.push(task);
            })
            this.calculateStatusCounts();
            this.setLoadingInitial(false);
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    private getTask = (id: string) => {
        return this.tasks.find(x => x.id === id);
    }

    loadTask = async (id: string) => {
        let task = this.tasks.find(x => x.id === id);
        if(task) {
            this.selectedTask = task;
            return task;
        }
        else {
            this.loadingInitial = true;
            try {
                task = await agent.Tasks.details(id);
                task.dueDate = new Date(task.dueDate!);
                runInAction(() => {
                    this.selectedTask = task;
                })
                this.setLoadingInitial(false);
                return task;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createTask = async (task: TaskFormValues) => {
        try {
            await agent.Tasks.create(task);
            const newTask = new Task(task);
            this.tasks.push(newTask);
            this.calculateStatusCounts();
        } catch(error) {
            console.log(error);
        }
    }

    updateTask = async (task: TaskFormValues) => {
        try {
            await agent.Tasks.update(task);
            runInAction(() => {
                if(task.id) {
                    const updatedTask = {...this.getTask(task.id), ...task};
                    const taskIndex = this.tasks.findIndex(x => x.id === task.id);
                    this.tasks[taskIndex] = updatedTask as Task;
                    this.calculateStatusCounts();
                }
            })
        } catch(error) {
            console.log(error);
        }
    }

    clearSelectedTask = () => {
        this.selectedTask = undefined;
    }

    deleteTask = async (id: string) => {
        try {
            await agent.Tasks.delete(id);
            runInAction(() => {
                this.tasks = this.tasks.filter(x => x.id !== id);
                this.calculateStatusCounts();
            })
        } catch(error) {
            console.log(error);
        }
    }

    calculateStatusCounts = () => {
        this.statusCounts = {};
        this.tasks.forEach(task => {
            this.statusCounts[TaskStatusLabels[task.status]] = (this.statusCounts[TaskStatusLabels[task.status]] || 0) + 1;
        })
    }
}