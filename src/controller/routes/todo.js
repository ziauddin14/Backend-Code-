import express from "express";
import { addTodo, getTodos, deleteTodo,  } from "../todo.js";
const router = express.Router();

router.post("/create", addTodo);
router.get("/todo", getTodos);
// router.put("/update/:id", updateTodo);
router.delete("/todo", deleteTodo);

export default router;
