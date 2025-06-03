import Router from "@koa/router";
import { taskController } from "../controllers/taskController";

const router = new Router();

// Task routes
router.get("/tasks", taskController.getAllTasks.bind(taskController));
router.get("/tasks/:id", taskController.getTaskById.bind(taskController));
router.post("/tasks", taskController.createTask.bind(taskController));
router.put("/tasks/:id", taskController.updateTask.bind(taskController));
router.patch("/tasks/:id", taskController.updateTask.bind(taskController)); // Allow PATCH for partial updates
router.delete("/tasks/:id", taskController.deleteTask.bind(taskController));
router.patch("/tasks/:id/toggle", taskController.toggleTaskCompletion.bind(taskController));

export default router;
