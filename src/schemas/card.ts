import joi from "joi";

export const createCardSchema = joi.object({
    type: joi.string().pattern( /^groceries$|^restaurant$|^transport$|^education$|^health$/ ).required()
});

export const activateCardSchema = joi.object({
    password: joi.string().pattern( /^[0-9]{4}$/ ).required()
});

export const rechargeCardSchema = joi.object({
    amount: joi.number().min(1).required()
});
