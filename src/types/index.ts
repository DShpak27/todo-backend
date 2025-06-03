export type Priority = "high" | "medium" | "low" | "none";
export type Category = "meeting" | "review" | "marketing" | "design" | "other";

export interface Task {
    id: string;
    isCompleted: boolean;
    text: string;
    priority: Priority;
    category: Category;
    dueDate?: Date;
    dueTime?: string;
    isRecurring: boolean;
}

export interface CreateTaskRequest {
    text: string;
    priority?: Priority;
    category?: Category;
    dueDate?: string | Date;
    dueTime?: string;
    isRecurring?: boolean;
}

export interface UpdateTaskRequest {
    isCompleted?: boolean;
    text?: string;
    priority?: Priority;
    category?: Category;
    dueDate?: string | Date;
    dueTime?: string;
    isRecurring?: boolean;
}
