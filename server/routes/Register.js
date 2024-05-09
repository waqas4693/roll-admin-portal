import express from "express";
import { registerUser, loginUser } from "../controller/Register";

// Rest of the code remains the same

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
