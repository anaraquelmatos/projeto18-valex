import { Router } from "express";
import { rechargeCard } from "../controllers/companyRechargesController.js";
import cardRouter from "./cardRouter.js";

const router = Router();
router.use(cardRouter);
router.use(rechargeCard);

export default router;