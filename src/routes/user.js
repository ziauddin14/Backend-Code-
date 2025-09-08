

import express from "express";
import { createUser, signinUser, getAllUsers} from "../controller/user.js";
import { verifyToken } from "../middleware/index.js";
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", signinUser);
router.get("/users", verifyToken, getAllUsers);

export default router;