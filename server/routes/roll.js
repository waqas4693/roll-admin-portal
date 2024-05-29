import express from "express";
import {
  addEmployeeRolls,
  getRollRecords,
  getSizeBasedReports,
  updateRollData,
  deleteRollData
} from "../controllers/roll.js";

const router = express.Router();

router.post("/", addEmployeeRolls);
router.get("/", getRollRecords);

router.get("/sizeBasedReports", getSizeBasedReports);
router.put("/:rollId", updateRollData);
router.delete("/:rollId", deleteRollData);

export default router;