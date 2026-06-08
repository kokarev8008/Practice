import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", (req, res) => taskController.getAllTasks(req, res));
router.get("/tasks/:id", (req, res) => taskController.getTaskById(req, res)); 

router.post("/tasks", (req, res) => taskController.createTask(req, res));

router.patch("/tasks/:id", (req, res) => taskController.patchTask(req, res));

router.delete("/tasks/:id", (req, res) => taskController.deleteTask(req, res));

export default router;