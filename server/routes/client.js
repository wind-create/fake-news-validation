import express from "express";
import { getQAHoaxNews, getFaq, updateData } from "../controllers/client.js"

const router = express.Router();

router.get("/qahoaxnews", getQAHoaxNews)
router.get("/faq", getFaq)

/* update */
router.patch("/:id/updateData", updateData)
export default router;