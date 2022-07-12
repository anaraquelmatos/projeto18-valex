import * as cardRepository from "../repositories/cardRepository.js";

export async function cardActive(id: number) {

    const validCard = await cardRepository.findById(id);

    if (validCard.isBlocked) {
        throw {
            type: "unauthorized",
            message: "card is blocked!"
        }
    }

}