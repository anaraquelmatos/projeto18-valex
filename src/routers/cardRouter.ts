import { Router } from "express";
import {createCard, activateCard, balanceAndTransactions, blockCard, unblockCard} from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/card-user-activate", activateCard);
cardRouter.post("/card-user", createCard);
cardRouter.get("/card-balance-transactions/:id", balanceAndTransactions);
cardRouter.post("/block-card", blockCard);
cardRouter.post("/unblock-card", unblockCard);

export default cardRouter;
