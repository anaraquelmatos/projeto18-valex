import * as cardRepository from "../repositories/cardRepository.js";

export async function cardActive(id: number) {

    const validCard = await cardRepository.findById(id);

    if (!validCard.password) {
        throw {
            type: "unauthorized",
            message: "card wasn't activated yet!"
        }
    }

}