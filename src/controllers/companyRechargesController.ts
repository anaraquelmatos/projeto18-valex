import { Request, Response } from "express";
import { amountCardSchema } from "../schemas/card.js";
import { rechargeUserCard } from "../services/rechargeCardService.js";

export async function rechargeCard(req: Request, res: Response) {

    const { authorization } = req.headers;

    const { id, amount }: { id: number, amount: number } = req.body;

    const key = authorization?.replace("Bearer", "").trim();

    const { error } = amountCardSchema.validate({ amount }, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await rechargeUserCard(id, key, amount);

    res.sendStatus(201);

}