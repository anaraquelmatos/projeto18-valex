import { Request, Response } from "express";
import { activateCardSchema } from "../schemas/card.js";
import * as activateCardService from "../services/activateCardService.js";

export async function activateCard(req: Request, res: Response) {

    const { id, cvc, password }: { id: number, cvc: string, password: string } = req.body;

    const { error } = activateCardSchema.validate({ password }, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await activateCardService.infosCardActivated(id, cvc, password);

    res.sendStatus(201);
}