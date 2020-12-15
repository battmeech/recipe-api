import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import mongoose from 'mongoose';
import { logger } from '../logger';
import { ErrorResponse } from '../models/errorResponse';
import { RecipeResponse } from '../models/recipeResponse';
import { create } from '../persistence/recipePersistence';
import { PersistedRecipe } from '../persistence/recipeSchema';
import { newRecipeRules } from '../validation/recipeValidation';

export default async (req: Request, res: Response) => {
    try {
        await newRecipeRules.validateAsync(req.body);
    } catch (err) {
        const error = err as ValidationError;
        res.status(400).send(
            new ErrorResponse(
                400,
                'Invalid recipe receieved',
                error.details[0].message
            )
        );
        return;
    }

    logger.info('Creating new recipe');

    let persistedRecipe: PersistedRecipe;
    try {
        persistedRecipe = await create(req.body);
    } catch (err) {
        const error = err as mongoose.Error;
        res.status(500).send(
            new ErrorResponse(500, 'Internal server error', error.message)
        );
        return;
    }

    res.status(200).send(new RecipeResponse(persistedRecipe));
};
