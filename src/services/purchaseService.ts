import { cardActive } from "../utils/cardActiveUtils.js";
import { decryptInformationCard } from "../utils/decryptInformationCardUtils.js";
import { expirationCard } from "../utils/validateExpirationCardUtils.js";
import { validateIdCard } from "../utils/validateIdCardUtils.js";
import * as businessRepository from "../repositories/businessRepository.js";
import { amountAvailableCard } from "../utils/amountAvailable.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

export async function cardPurchasesUser(id: number, password: string, businessId: number, amount: number) {

    const card = {cardId: id, businessId, amount};

    const validCard = await validateIdCard(id);

    await expirationCard(validCard.card.expirationDate);

    await cardActive(id);

    const decryptPassword = await decryptInformationCard(validCard.card.password);

    if (decryptPassword.decryptInformationCard !== password) {
        throw {
            type: "unauthorized",
            message: "incorrect password!"
        }
    }

    const validBusiness = await businessRepository.findById(businessId);

    if(!validBusiness){
        throw {
            type: "unauthorized",
            message: "invalid business!"
        }
    }

    if(validBusiness.type !== validCard.card.type){
        throw {
            type: "unauthorized",
            message: "different types!"
        }
    }

    const amountAvailable = await amountAvailableCard(id);

    if(amountAvailable.finalBalance < amount){
        throw {
            type: "unauthorized",
            message: "amount insufficient!"
        }
    }

    await paymentUpdate(card);
}

export async function paymentUpdate(card: paymentRepository.PaymentInsertData){

    await paymentRepository.insert(card);
}