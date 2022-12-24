import express from "express";
import { getQAHoaxNews, getFAQById ,getFaq, updateDataFaq, deleteFaq } from "../controllers/client.js"

const router = express.Router();

router.get("/qahoaxnews", getQAHoaxNews)
router.get("/faq", getFaq)

/* get data by id */
router.get("/faq/:id", getFAQById)
/* update */
router.patch("/faq/:id/updatedatafaq", updateDataFaq)

router.delete("/faq/:id/deletefaq", deleteFaq)

export default router;