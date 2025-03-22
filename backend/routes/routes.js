import express from "express";
import { getAllProducts, getProductbyId, scrapper } from "../controllers/scrapper.js";

const router = express.Router();

router.post("/add", scrapper);
router.get('/',getAllProducts);
router.get('/:id',getProductbyId);

export default router