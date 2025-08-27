import express from "express";
import { addTodo, getTodos, deleteTodo, updateTodo } from "../todo.js";
const router = express.Router();

router.post("/create", addTodo);
router.get("/get", getTodos);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
