import express from "express";
import { getQAHoaxNews, getFaq, updateDataFaq } from "../controllers/client.js"

const router = express.Router();

router.get("/qahoaxnews", getQAHoaxNews)
router.get("/faq", getFaq)

/* update */
router.patch("/faq/:id/updateData", updateDataFaq)

export default router;