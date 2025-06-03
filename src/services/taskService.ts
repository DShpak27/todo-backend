import { v4 as uuidv4 } from "uuid";
import { Task, CreateTaskRequest } from "../types";
import { database } from "../database";

export class TaskService {
    getAllTasks(): Task[] {
        return database.getAllTasks();
    }

    getTaskById(id: string): Task | undefined {
        return database.getTaskById(id);
    }

    createTask(taskData: CreateTaskRequest): Task {
        const newTask: Task = {
            id: uuidv4(),
            isCompleted: false,
            text: taskData.text,
            priority: taskData.priority || "medium",
            category: taskData.category || "other",
            dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
            dueTime: taskData.dueTime,
            isRecurring: taskData.isRecurring || false,
        };

        return database.createTask(newTask);
    }

    updateTask(id: string, updates: Partial<Task>): Task | null {
        if (updates.dueDate && typeof updates.dueDate === "string") {
            updates.dueDate = new Date(updates.dueDate);
        }

        return database.updateTask(id, updates);
    }

    deleteTask(id: string): boolean {
        return database.deleteTask(id);
    }

    toggleTaskCompletion(id: string): Task | null {
        const task = database.getTaskById(id);
        if (!task) {
            return null;
        }

        return database.updateTask(id, { isCompleted: !task.isCompleted });
    }
}

export const taskService = new TaskService();
