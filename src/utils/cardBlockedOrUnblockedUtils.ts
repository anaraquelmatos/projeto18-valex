import * as cardRepository from "../repositories/cardRepository.js";

export async function cardBlockedOrUnblocked(id: number, isBlocked: boolean) {

    await cardRepository.update(id, { isBlocked});

}