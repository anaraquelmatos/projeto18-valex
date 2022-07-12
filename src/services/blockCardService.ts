import { decryptInformationCard } from "../utils/decryptInformationCardUtils.js";
import { expirationCard } from "../utils/validateExpirationCardUtils.js";
import { validateIdCard } from "../utils/validateIdCardUtils.js";
import { cardBlockedOrUnblocked } from "../utils/cardBlockedOrUnblockedUtils.js";

export async function blockCardInformations(id: number, password: string) {

    const cardInfo = await validateIdCard(id);

    const IS_BLOCKED = true;

    await expirationCard(cardInfo.card.expirationDate);

    if (cardInfo.card.isBlocked) {
        throw {
            type: "unauthorized",
            message: "card is already blocked!"
        }
    }

    const decryptPassword = await decryptInformationCard(cardInfo.card.password);

    if (decryptPassword.decryptInformationCard !== password) {
        throw {
            type: "unauthorized",
            message: "incorrect password!"
        }
    }

    await cardBlockedOrUnblocked(id, IS_BLOCKED);

}

