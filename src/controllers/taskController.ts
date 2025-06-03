import { Context } from "koa";
import { taskService } from "../services/taskService";
import { CreateTaskRequest, UpdateTaskRequest, Task } from "../types";

export class TaskController {
    async getAllTasks(ctx: Context): Promise<void> {
        try {
            const tasks = taskService.getAllTasks();
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: tasks,
                message: "Tasks retrieved successfully",
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }

    async getTaskById(ctx: Context): Promise<void> {
        try {
            const { id } = ctx.params;
            const task = taskService.getTaskById(id);

            if (!task) {
                ctx.status = 404;
                ctx.body = {
                    success: false,
                    message: "Task not found",
                };
                return;
            }

            ctx.status = 200;
            ctx.body = {
                success: true,
                data: task,
                message: "Task retrieved successfully",
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }

    async createTask(ctx: Context): Promise<void> {
        try {
            const taskData = ctx.request.body as CreateTaskRequest;

            if (!taskData.text || taskData.text.trim() === "") {
                ctx.status = 400;
                ctx.body = {
                    success: false,
                    message: "Task text is required",
                };
                return;
            }

            const newTask = taskService.createTask(taskData);

            ctx.status = 201;
            ctx.body = {
                success: true,
                data: newTask,
                message: "Task created successfully",
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }

    async updateTask(ctx: Context): Promise<void> {
        try {
            const { id } = ctx.params;
            const updates = ctx.request.body as UpdateTaskRequest;

            const processedUpdates: Partial<Task> = {
                ...updates,
                dueDate: updates.dueDate
                    ? typeof updates.dueDate === "string"
                        ? new Date(updates.dueDate)
                        : updates.dueDate
                    : undefined,
            };

            const updatedTask = taskService.updateTask(id, processedUpdates);

            if (!updatedTask) {
                ctx.status = 404;
                ctx.body = {
                    success: false,
                    message: "Task not found",
                };
                return;
            }

            ctx.status = 200;
            ctx.body = {
                success: true,
                data: updatedTask,
                message: "Task updated successfully",
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }

    async deleteTask(ctx: Context): Promise<void> {
        try {
            const { id } = ctx.params;
            const deleted = taskService.deleteTask(id);

            if (!deleted) {
                ctx.status = 404;
                ctx.body = {
                    success: false,
                    message: "Task not found",
                };
                return;
            }

            ctx.status = 200;
            ctx.body = {
                success: true,
                message: "Task deleted successfully",
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }

    async toggleTaskCompletion(ctx: Context): Promise<void> {
        try {
            const { id } = ctx.params;
            const updatedTask = taskService.toggleTaskCompletion(id);

            if (!updatedTask) {
                ctx.status = 404;
                ctx.body = {
                    success: false,
                    message: "Task not found",
                };
                return;
            }

            ctx.status = 200;
            ctx.body = {
                success: true,
                data: updatedTask,
                message: "Task completion status toggled successfully",
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
}

export const taskController = new TaskController();
