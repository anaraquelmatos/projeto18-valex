import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dayjs from "dayjs";

dotenv.config();

const EXPIRATION_TIME = 5;

async function encryptSecurityCode(securityCode: string) {
    const securityCodeCard = new Cryptr(process.env.KEY);
    const securityCodeEncrypted = securityCodeCard.encrypt(securityCode);
    return securityCodeEncrypted;
}

export async function infosCardCreated(id: number, type: cardRepository.TransactionTypes, key: string) {

    const fullName = await validateCardRepos(id, type, key);

    const numberCard = faker.finance.creditCardNumber('####-####-####-####');

    const securityCode = faker.finance.creditCardCVV();

    const securityCodeEncrypted = await encryptSecurityCode(securityCode);

    const expirationDate = dayjs().add(EXPIRATION_TIME, 'year').format('MM/YY');

    await insertCardRepos(id, type, fullName.name, numberCard, securityCodeEncrypted, expirationDate)

}

export async function validateCardRepos(id: number, type: cardRepository.TransactionTypes, key: string) {

    const validateId = await employeeRepository.findById(id);
    const validateType = await cardRepository.findByTypeAndEmployeeId(type, id);
    const validateKey = await companyRepository.findByApiKey(key);

    if (!validateId) {
        throw {
            type: "doesn't exist",
            message: "user id doesn't exist!"
        }
    }
    if (!validateKey) {
        throw {
            type: "doesn't exist",
            message: "apiKey doesn't exist!"
        }
    }
    if (validateType) {
        throw {
            type: "conflict",
            message: "the user has this type already"
        }
    }

    const fullName = validateId.fullName.toUpperCase();

    const array = fullName.split(" ");

    for (let i = 1; i < array.length - 1; i++) {
        array[i].length >= 3 ? array[i] = array[i][0] : array.splice(i, 1);
    }

    const name = array.join(" ");

    return {
        name
    }

}

export async function insertCardRepos(id: number, type: cardRepository.TransactionTypes, fullName: string, numberCard: string, cvcEncrypted: string,
    expirationDate: string) {

    const infosCardUser = {
        employeeId: id,
        number: numberCard,
        cardholderName: fullName,
        securityCode: cvcEncrypted,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type
    }

    await cardRepository.insert(infosCardUser);

}