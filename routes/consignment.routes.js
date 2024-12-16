import express from "express";
import {
  addConsignment,
  getAllConsignments,
  searchConsignment,
  deleteConsignment,
  updateConsignment,
} from "../controllers/consignment.controller.js";

const router = express.Router();

router.post("/add", addConsignment);
router.get("/fetch-all", getAllConsignments);
router.get("/search/:searchTerm", searchConsignment);
router.delete("/delete/:id", deleteConsignment);
router.put("/update/:id", updateConsignment);

export default router;
