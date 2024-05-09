import express from "express";
import { loginUser } from "../controllers/adminLogin.js";

// Rest of the code remains the same

const router = express.Router();


router.post("/", loginUser);

export default router;
