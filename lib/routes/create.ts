import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import mongoose from 'mongoose';
import { logger } from '../logger';
import { ErrorResponse } from '../models/errorResponse';
import { RecipeResponse } from '../models/recipeResponse';
import { create } from '../persistence/recipePersistence';
import { PersistedRecipe } from '../persistence/recipeSchema';
import { newRecipeRules } from '../validation/recipeValidation';

/**
 * This route is for creating new recipes. Requires a HTTP request with a valid Recipe
 */
export default async (req: Request, res: Response) => {
    logger.debug(`Entered route ${req.path}`);
    logger.info('Create recipe endpoint called');
    try {
        logger.debug('Validating recipe against schema');
        await newRecipeRules.validateAsync(req.body);
    } catch (err) {
        logger.error('Errors found in request body');
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

    let persistedRecipe: PersistedRecipe;
    try {
        logger.debug('Attempting to save new recipe');
        persistedRecipe = await create(req.body);
    } catch (err) {
        logger.error('Error encountered when attempting to save recipe');
        const error = err as mongoose.Error;
        res.status(500).send(
            new ErrorResponse(500, 'Internal server error', error.message)
        );
        logger.debug(error.stack);
        return;
    }

    logger.debug(
        `Recipe successfully saved id: ${persistedRecipe._id}, returning response to client`
    );
    logger.info('New recipe saved');

    res.status(200).send(
        new RecipeResponse(persistedRecipe, persistedRecipe._id)
    );
};
