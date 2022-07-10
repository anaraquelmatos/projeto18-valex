import joi from "joi";

export const cardSchema = joi.object({
    type: joi.string().pattern( /^groceries$|^restaurants$|^transport$|^education$|^health$/ ).required(),
    key: joi.string().required()
});