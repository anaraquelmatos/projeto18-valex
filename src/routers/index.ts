import { Router } from "express";
import activatedCardRouter from "./activateCardRouter.js";
import createCardRouter from "./createCardRouter.js";

const router = Router();
router.use(createCardRouter);
router.use(activatedCardRouter);

export default router;