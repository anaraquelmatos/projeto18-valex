import { Router } from "express";
import {createCard, activateCard, balanceAndTransactions } from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/card-user-activate", activateCard);
cardRouter.post("/card-user", createCard);
cardRouter.get("/card-balance-transactions/:id", balanceAndTransactions);

export default cardRouter;
