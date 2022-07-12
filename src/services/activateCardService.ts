import * as cardRepository from "../repositories/cardRepository.js";
import { validateIdCard } from "../utils/validateIdCardUtils.js";
import { encryptInformation } from "../utils/encryptInfoUtils.js";
import { decryptInformationCard } from "../utils/decryptInformationCardUtils.js";

import dotenv from "dotenv";
import { expirationCard } from "../utils/validateExpirationCardUtils.js";


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
