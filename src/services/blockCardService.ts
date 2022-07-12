import { decryptInformationCard } from "../utils/decryptInformationCard.js";
import { expirationCard } from "../utils/validateExpirationCard.js";
import { validateIdCard } from "../utils/validateIdCard.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function blockCardInformations(id: number, password: string) {

    const cardInfo = await validateIdCard(id);

    await expirationCard(cardInfo.card.expirationDate);

    if (cardInfo.card.isBlocked === true) {
        throw {
            type: "doesn't exist",
            message: "card is already blocked!"
        }
    }

    const decryptPassword = await decryptInformationCard(cardInfo.card.password);

    if (decryptPassword.decryptInformationCard !== password) {
        throw {
            type: "doesn't exist",
            message: "incorrect password!"
        }
    }

    await upadateCard(id);

}

async function upadateCard(id: number) {
    await cardRepository.update(id, { isBlocked: true });
}