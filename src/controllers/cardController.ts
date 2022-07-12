import { Request, Response } from "express";
import { activateCardSchema } from "../schemas/card.js";
import * as activateCardService from "../services/activateCardService.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { createCardSchema } from "../schemas/card.js";
import * as createCardService from "../services/createCardService.js";
import { balanceAndTransactionsCard } from "../services/balanceAndTransactionsService.js";
import { blockCardInformations } from "../services/blockCardService.js";
import { unblockCardInformations } from "../services/unblockCardService.js";


export async function createCard(req: Request, res: Response) {

    const { authorization } = req.headers;

    const { id, type }: { id: number, type: TransactionTypes } = req.body;

    const key = authorization?.replace("Bearer", "").trim();

    const { error } = createCardSchema.validate({ type }, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await createCardService.infosCardCreated(id, type, key);

    res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {

    const { id, cvc, password }: { id: number, cvc: string, password: string } = req.body;

    const { error } = activateCardSchema.validate({ password }, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await activateCardService.infosCardActivated(id, cvc, password);

    res.sendStatus(201);
}

export async function balanceAndTransactions(req: Request<{ id: number }>, res: Response) {

    const { id } = req.params;

    const informationsCard = await balanceAndTransactionsCard(id);

    res.send(informationsCard).status(200);

}

export async function blockCard(req: Request, res: Response) {

    const { id, password }: { id: number, password: string } = req.body;

    await blockCardInformations(id, password);

    res.sendStatus(200);

}

export async function unblockCard(req: Request, res: Response) {

    const { id, password }: { id: number, password: string } = req.body;

    await unblockCardInformations(id, password);

    res.sendStatus(200);

}


