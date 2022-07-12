import { Router } from "express";
import { cardPurchase } from "../controllers/purchaseController.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchase-card", cardPurchase);

export default purchaseRouter;