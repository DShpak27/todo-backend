import { Task } from "../types";

class InMemoryDatabase {
    private tasks: Task[] = [
        {
            id: "1",
            isCompleted: false,
            text: "Project daily stand-up",
            priority: "medium",
            category: "meeting",
            dueDate: new Date("2025-06-03"),
            dueTime: "09:30",
            isRecurring: true,
        },
        {
            id: "2",
            isCompleted: false,
            text: "Interna new UI style",
            priority: "high",
            category: "design",
            dueDate: new Date("2025-06-03"),
            dueTime: "11:30",
            isRecurring: false,
        },
        {
            id: "3",
            isCompleted: false,
            text: "Weekly Review",
            priority: "low",
            category: "review",
            dueDate: new Date("2025-06-03"),
            dueTime: "10:30",
            isRecurring: true,
        },
        {
            id: "4",
            isCompleted: false,
            text: "Interview",
            priority: "high",
            category: "meeting",
            dueDate: new Date("2025-06-04"),
            dueTime: "16:30",
            isRecurring: false,
        },
    ];

    getAllTasks(): Task[] {
        return [...this.tasks];
    }

    getTaskById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    createTask(task: Task): Task {
        this.tasks.push(task);
        return task;
    }

    updateTask(id: string, updates: Partial<Task>): Task | null {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return null;
        }

        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
        return this.tasks[taskIndex];
    }

    deleteTask(id: string): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return false;
        }

        this.tasks.splice(taskIndex, 1);
        return true;
    }
}

export const database = new InMemoryDatabase();
