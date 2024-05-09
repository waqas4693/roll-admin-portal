import express from "express";
import {
  createRoll,
  getAllRolls,
  getSizeBasedReports,
  updateRollData,
  deleteRollData
} from "../controllers/roll.js";

const router = express.Router();

router.post("/", createRoll);
router.get("/", getAllRolls);
router.get("/sizeBasedReports", getSizeBasedReports);
router.put("/:rollId", updateRollData);
router.delete("/:rollId", deleteRollData);

export default router;