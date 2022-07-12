import * as cardRepository from "../repositories/cardRepository.js";
import { validateIdCard } from "../utils/validateIdCard.js";
import { encryptInformation } from "../utils/encryptInfo.js";
import { decryptInformationCard } from "../utils/decryptInformationCard.js";

import dotenv from "dotenv";
import { expirationCard } from "../utils/validateExpirationCard.js";


dotenv.config();

export async function infosCardActivated(id: number, cvc: string, password: string) {

    await validateInfosCardActivate(id, cvc, password);

    const passwordEncrypted = await encryptInformation(password);

    await updateCard(passwordEncrypted.infoCardEncrypted, id);

}

async function validateInfosCardActivate(id: number, cvc: string, password: string) {

    const validateId = await validateIdCard(id);

    const decryptedSecurityCode = await decryptInformationCard(validateId.card.securityCode);

    await expirationCard(validateId.card.expirationDate);

    if (decryptedSecurityCode.decryptInformationCard !== cvc) {
        throw {
            type: "doesn't exist",
            message: "incorrect security code!"
        }
    }

    if (validateId.card.password) {
        throw {
            type: "conflict",
            message: "the user already has a registered password!"
        }
    }

}

async function updateCard(password: string, cardId: number) {

    await cardRepository.update(cardId, { password });
}
