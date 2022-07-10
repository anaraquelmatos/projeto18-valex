import { Router } from "express";
import { createCard } from "../controllers/createCardController.js";

const createCardRouter = Router();

createCardRouter.post("/card-user", createCard);

export default createCardRouter;
