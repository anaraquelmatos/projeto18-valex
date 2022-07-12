import * as cardRepository from "../repositories/cardRepository.js";

export async function validateIdCard(id: number) {

    const card = await cardRepository.findById(id);

    if (!card) {
        throw {
            type: "unauthorized",
            message: "card id doesn't exist!"
        }
    }

    return {
        card
    };
}