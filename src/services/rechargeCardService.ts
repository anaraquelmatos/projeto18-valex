import { expirationCard } from "../utils/validateExpirationCardUtils.js";
import { validateIdCard } from "../utils/validateIdCardUtils.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";

export async function rechargeUserCard(id: number, key: string, amount: number) {

    const recharge = { cardId: id, amount }

    const validateKey = await companyRepository.findByApiKey(key);

    const validCard = await validateIdCard(id);

    if (!validateKey) {
        throw {
            type: "unauthorized",
            message: "apiKey doesn't exist!"
        }
    }

    if (validCard.card.isBlocked) {
        throw {
            type: "unauthorized",
            message: "card is blocked!"
        }
    }

    await expirationCard(validCard.card.expirationDate);

    await updateRecharge(recharge);

}

async function updateRecharge(recharge: rechargeRepository.RechargeInsertData) {

    await rechargeRepository.insert(recharge);
}