import * as cardRepository from "../repositories/cardRepository.js";
import { validateIdCard } from "../utils/validateIdCardUtils.js";
import { encryptInformation } from "../utils/encryptInfoUtils.js";

import dotenv from "dotenv";
import { expirationCard } from "../utils/validateExpirationCardUtils.js";
import { activateCardSchema } from "../schemas/card.js";


dotenv.config();

export async function infosCardActivated(id: number, cvc: string, password: string) {

    await validateInfosCardActivate(id, cvc, password);

    const passwordEncrypted = await encryptInformation(password);

    await updateCard(passwordEncrypted.infoCardEncrypted, id);

}

async function validateInfosCardActivate(id: number, cvc: string, password: string) {

    const validateId = await validateIdCard(id);

    await expirationCard(validateId.card.expirationDate);

    if (validateId.card.password) {
        throw {
            type: "conflict",
            message: "the user already has a registered password!"
        }
    }

    const { error } = activateCardSchema.validate({ password }, { abortEarly: false });

    if (error) {
        throw {
            type: "unprocessable entity",
            message: "the password don't have four numbers!"
        }
    }

}

async function updateCard(password: string, cardId: number) {

    await cardRepository.update(cardId, { password });
}