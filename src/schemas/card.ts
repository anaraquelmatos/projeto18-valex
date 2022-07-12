import joi from "joi";

export const createCardSchema = joi.object({
    key: joi.string().required(),
    type: joi.string().pattern( /^groceries$|^restaurant$|^transport$|^education$|^health$/ ).required(),
    employeeId: joi.number().integer().required()
});

export const activateCardSchema = joi.object({
    password: joi.string().pattern( /^[0-9]{4}$/ ).required()
});

export const amountCardSchema = joi.object({
    amount: joi.number().min(1).required()
});
