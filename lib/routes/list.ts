import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import mongoose from 'mongoose';
import { logger } from '../logger';
import { ErrorResponse } from '../models/errorResponse';
import { ListRecipe, ListResponse } from '../models/listResponse';
import { list } from '../persistence/recipePersistence';
import { constructQuery } from '../utils/query';
import { listRequestValidationRules } from '../validation/listRequestValidation';

export default async (req: Request, res: Response) => {
    logger.debug(`Entered route ${req.path}`);
    logger.info('List recipe endpoint called');
    try {
        logger.debug('Validating recipe against schema');
        await listRequestValidationRules.validateAsync(req.body);
    } catch (err) {
        logger.error('Errors found in request body');
        const error = err as ValidationError;
        res.status(400).send(
            new ErrorResponse(
                400,
                'Invalid request receieved',
                error.details[0].message
            )
        );
        return;
    }

    const query = constructQuery(req.body);

    let results = [];

    try {
        logger.debug('Searching DB based on query');
        results = await list(query, req.body);
    } catch (err) {
        logger.error('Error encountered when attempting to list recipes');
        const error = err as mongoose.Error;
        res.status(500).send(
            new ErrorResponse(500, 'Internal server error', error.message)
        );
        logger.debug(error.stack);
        return;
    }

    const response: ListResponse = {
        recipes: results.map((result) => new ListRecipe(result, result.slug)),
        pageToken: results?.length > 0 ? results[results.length - 1]._id : '',
    };

    res.status(200).send(response);
};
