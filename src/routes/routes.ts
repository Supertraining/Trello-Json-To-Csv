import { Router } from "express";
import { CONTROLLERS } from "../controllers/controllers.js";
import upload from "../config/multer.config.js";

const router = Router();
router.get("/", CONTROLLERS.renderBoard);
router.post("/download", upload.single("file"), CONTROLLERS.downloadCSV);

export default router;
