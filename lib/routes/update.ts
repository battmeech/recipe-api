import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import mongoose from 'mongoose';
import { logger } from '../logger';
import { ErrorResponse } from '../models/errorResponse';
import { RecipeResponse } from '../models/recipeResponse';
import { update } from '../persistence/recipePersistence';
import { PersistedRecipe } from '../persistence/recipeSchema';
import { recipeValidationRules } from '../validation/recipeValidation';

/**
 * This route is for updating existing recipes. Requires a HTTP request with a valid Recipe
 * in the body and ID in the URL
 */
export default async (req: Request, res: Response) => {
    logger.debug(`Entered route ${req.path}`);
    logger.info('Update recipe endpoint called');
    try {
        logger.debug('Validating recipe against schema');
        await recipeValidationRules.validateAsync(req.body);
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

    const id = req.params.id;

    logger.debug(`Updating recipe with ID ${id}`);

    let persistedRecipe: PersistedRecipe | null;
    try {
        logger.debug('Attempting to update recipe');
        persistedRecipe = await update(id, req.body);
    } catch (err) {
        logger.error('Error encountered when attempting to update recipe');
        const error = err as mongoose.Error;
        res.status(500).send(
            new ErrorResponse(500, 'Internal server error', error.message)
        );
        logger.debug(error.stack);
        return;
    }

    if (!persistedRecipe) {
        res.status(404).send(
            new ErrorResponse(
                404,
                'Recipe not found',
                `Recipe with id "${id}" could not be found`
            )
        );
    } else {
        logger.debug(
            `Recipe successfully updated id: ${persistedRecipe._id}, returning response to client`
        );
        logger.info('New recipe saved');

        res.status(200).send(
            new RecipeResponse(
                req.body,
                persistedRecipe._id,
                persistedRecipe.updatedAt
            )
        );
    }
};
