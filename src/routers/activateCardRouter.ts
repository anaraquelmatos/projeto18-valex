import { Router } from "express";
import { activateCard } from "../controllers/activateCardController.js";

const activatedCardRouter = Router();

activatedCardRouter.post("/card-user-activate", activateCard);

export default activatedCardRouter;
