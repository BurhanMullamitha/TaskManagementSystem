import axios, { AxiosResponse } from "axios";
import { Task, TaskFormValues } from "../models/task";

axios.defaults.baseURL = "https://localhost:7002/api"

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    return response;
})

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Tasks = {
    list: () => requests.get<Task[]>("/tasks"),
    details: (id: string) => requests.get<Task>(`/tasks/${id}`),
    create: (task: TaskFormValues) => requests.post<void>("/tasks", task),
    update: (task: TaskFormValues) => requests.put<void>(`/tasks/${task.id}`, task),
    delete: (id: string) => requests.del<void>(`/tasks/${id}`)
}

const agent = {
    Tasks
}

export default agent;