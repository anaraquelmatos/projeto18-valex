import { decryptInformationCard } from "../utils/decryptInformationCardUtils.js";
import { expirationCard } from "../utils/validateExpirationCardUtils.js";
import { validateIdCard } from "../utils/validateIdCardUtils.js";
import { cardBlockedOrUnblocked } from "../utils/cardBlockedOrUnblockedUtils.js";

export async function unblockCardInformations(id: number, password: string) {

    const cardInfo = await validateIdCard(id);

    const IS_BLOCKED = false;

    await expirationCard(cardInfo.card.expirationDate);

    if (!cardInfo.card.isBlocked) {
        throw {
            type: "conflict",
            message: "card is already unblocked!"
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
