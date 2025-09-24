import express from "express";
import { createStudent, getAllStudents } from "../controllers/srudent.js";
const router = express.Router();

router.post("/create", createStudent);
router.get("/all", getAllStudents);

export default router;
