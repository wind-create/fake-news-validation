import express from "express";
import { getQAHoaxNews } from "../controllers/client.js"

const router = express.Router();

router.get("/qahoaxnews", getQAHoaxNews)

export default router;