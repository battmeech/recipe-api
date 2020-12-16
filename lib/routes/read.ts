import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../logger';
import { ErrorResponse } from '../models/errorResponse';
import { RecipeResponse } from '../models/recipeResponse';
import { read } from '../persistence/recipePersistence';
import { PersistedRecipe } from '../persistence/recipeSchema';

/**
 * The route for reading a single recipe. Requires a HTTP request with ID in the URL
 */
export default async (req: Request, res: Response) => {
    logger.debug(`Entered route ${req.path}`);
    logger.info('Read recipe endpoint called');

    const id = req.params.id;

    logger.debug(`Reading recipe with ID ${id}`);

    let persistedRecipe: PersistedRecipe | null;
    try {
        logger.debug('Using ID to search Mongo');
        persistedRecipe = await read(id);
    } catch (err) {
        logger.error('Error encountered when attempting to read recipe');
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
        logger.info('Recipe found successfully');

        res.status(200).send(
            new RecipeResponse(
                persistedRecipe,
                persistedRecipe._id,
                persistedRecipe.createdAt
            )
        );
    }
};
