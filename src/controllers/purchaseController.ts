import { Request, Response } from "express";
import { amountCardSchema } from "../schemas/card.js";
import { cardPurchasesUser } from "../services/purchaseService.js";

export async function cardPurchase(req: Request, res: Response) {

    const { id, password, businessId, amount }: {
        id: number, password: string, businessId: number,
        amount: number
    } = req.body;

    const { error } = amountCardSchema.validate({ amount }, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await cardPurchasesUser(id, password, businessId, amount);

    res.sendStatus(201);
}