import express from "express";
import { getQAHoaxNews, getFAQById ,getFaq, updateDataFaq, deleteFaq, updateDataQAHoax, deleteQAHoax, getQAHoaxById } from "../controllers/client.js"

const router = express.Router();
/* QA hoax */
router.get("/qahoaxnews", getQAHoaxNews)
/* get data by id */
router.get("/qahoaxnews/:id", getQAHoaxById)
/* update */
router.patch("/qahoaxnews/:id/updatedataqahoax", updateDataQAHoax)
router.delete("/qahoaxnews/:id/deleteQAHoax", deleteQAHoax)


/* FAQ */
router.get("/faq", getFaq)
/* get data by id */
router.get("/faq/:id", getFAQById)
/* update */
router.patch("/faq/:id/updatedatafaq", updateDataFaq)
router.delete("/faq/:id/deletefaq", deleteFaq)

export default router;