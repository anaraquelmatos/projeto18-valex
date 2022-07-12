import { countValues } from "./countValuesUtils.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

export async function amountAvailableCard(id: number) {

    const transactions = await paymentRepository.findByCardId(id);

    const sumTransactions = await countValues(transactions);

    const recharges = await rechargeRepository.findByCardId(id);

    const sumRecharges = await countValues(recharges);

    const finalBalance = sumRecharges.total - sumTransactions.total;

    return{
        transactions, 
        recharges,
        finalBalance
    };

}