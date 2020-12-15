import joi from 'joi';

export const newRecipeRules = joi.object({
    name: joi
        .string()
        .min(2)
        .max(50)
        .required(),
    serves: joi
        .number()
        .integer()
        .greater(0)
        .required(),
});
