import { amountAvailableCard } from "../utils/amountAvailable.js";
import { validateIdCard } from "../utils/validateIdCardUtils.js";

export async function balanceAndTransactionsCard(id: number) {

    await validateIdCard(id);

    const card = await amountAvailableCard(id);

    return {
        balance: card.finalBalance,
        transactions: card.transactions,
        recharges: card.recharges
    }
}