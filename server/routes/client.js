import express from "express";
import { getQAHoaxNews, getFaq } from "../controllers/client.js"

const router = express.Router();

router.get("/qahoaxnews", getQAHoaxNews)
router.get("/faq", getFaq)

export default router;