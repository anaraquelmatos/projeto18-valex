import { validateIdCard } from "../utils/validateIdCard.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

export async function balanceAndTransactionsCard(id: number) {

    await validateIdCard(id);

    const transactions = await paymentRepository.findByCardId(id);

    const sumTransactions = await countValues(transactions);

    const recharges = await rechargeRepository.findByCardId(id);

    const sumRecharges = await countValues(recharges);

    const finalBalance = sumRecharges.total - sumTransactions.total;

    return {
        balance: finalBalance,
        transactions: transactions,
        recharges: recharges
    }
}

async function countValues(values: any[]) {

    let total: number = null;

    values.map(value => {
        total += value.amount;
    });

    return {
        total
    };
}