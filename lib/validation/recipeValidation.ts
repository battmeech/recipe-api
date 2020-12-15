import { checkSchema } from 'express-validator';

export const newRecipeRules = checkSchema({
    name: {
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: 'Recipes require a name.',
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage:
                'Recipe name should be at least 2 characters long with a maximum of 50.',
        },
        trim: true,
    },
});
