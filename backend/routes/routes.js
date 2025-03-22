import express from "express";
import { scrapper } from "../controllers/scrapper.js";

const router = express.Router();

router.post("/add", scrapper);

export default router