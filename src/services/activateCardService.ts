import * as cardRepository from "../repositories/cardRepository.js";
import { encryptInfo } from "./createCardService.js";

import Cryptr from "cryptr";
import dotenv from "dotenv";
import dayjs from "dayjs";

dotenv.config();

const DATE_TODAY = dayjs().format('MM/YY');

async function decryptSecurityCode(securityCode: string) {
    const securityCodeCard = new Cryptr(process.env.KEY);
    const securityCodeEncrypted = securityCodeCard.decrypt(securityCode);
    return securityCodeEncrypted;
}

export async function infosCardActivated(id: number, cvc: string, password: string) {

    await validateInfosCardActivate(id, cvc, password);

    const passwordEncrypted = await encryptInfo(password);

    await updateCard(passwordEncrypted, id);

}

async function validateInfosCardActivate(id: number, cvc: string, password: string) {

    const validateId = await cardRepository.findById(id);

    const decryptedSecurityCode = await decryptSecurityCode(validateId.securityCode);

    if (!validateId) {
        throw {
            type: "doesn't exist",
            message: "user id doesn't exist!"
        }
    }

    if (validateId.expirationDate < DATE_TODAY) {
        throw {
            type: "doesn't exist",
            message: "expired expiration date!"
        }
    }

    if (decryptedSecurityCode !== cvc) {
        throw {
            type: "doesn't exist",
            message: "incorrect security code!"
        }
    }

    if (validateId.password) {
        throw {
            type: "conflict",
            message: "the user already has a registered password!"
        }
    }

}

async function updateCard(password: string, cardId: number) {

    await cardRepository.update(cardId, { password });
}
