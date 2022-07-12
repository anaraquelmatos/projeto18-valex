import * as cardRepository from "../repositories/cardRepository.js";
import { encryptInfo } from "./createCardService.js";

import Cryptr from "cryptr";
import dotenv from "dotenv";
import dayjs from "dayjs";
import { validateIdCard } from "../utils/validateIdCard.js";
import { encryptInformation } from "../utils/encryptInfo.js";

dotenv.config();

const DATE_TODAY = dayjs().format('MM/YY');

async function decryptSecurityCode(info: string) {
    const informationCard = new Cryptr(process.env.KEY);
    const decryptInformationCard = informationCard.decrypt(info);
    return {
        decryptInformationCard
    };
}

export async function infosCardActivated(id: number, cvc: string, password: string) {

    await validateInfosCardActivate(id, cvc, password);

    const passwordEncrypted = await encryptInformation(password);

    await updateCard(passwordEncrypted.infoCardEncrypted, id);

}

async function validateInfosCardActivate(id: number, cvc: string, password: string) {

    const validateId = await validateIdCard(id);

    const decryptedSecurityCode = await decryptSecurityCode(validateId.card.securityCode);

    if (validateId.card.expirationDate < DATE_TODAY) {
        throw {
            type: "doesn't exist",
            message: "expired expiration date!"
        }
    }

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
