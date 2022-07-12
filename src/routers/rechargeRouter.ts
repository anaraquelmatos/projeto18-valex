import { Router } from "express";
import { rechargeCard } from "../controllers/companyRechargesController.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge-card", rechargeCard);

export default rechargeRouter;
