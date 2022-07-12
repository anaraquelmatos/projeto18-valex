import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { createCardSchema } from "../schemas/card.js";
import * as createCardService from "../services/createCardService.js";

export async function createCard(req: Request, res: Response) {

    const { authorization } = req.headers;

    const { id, type }: { id: number, type: TransactionTypes } = req.body;

    const key = authorization?.replace("Bearer", "").trim().replace("-api-key", "");

    const { error } = createCardSchema.validate({ type, key }, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await createCardService.infosCardCreated(id, type, key);

    res.sendStatus(201);
}
