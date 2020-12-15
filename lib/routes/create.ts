import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { logger } from '../logger';
import { ErrorResponse } from '../models/errorResponse';
import { newRecipeRules } from '../validation/recipeValidation';

export default async (req: Request, res: Response) => {
    try {
        await newRecipeRules.validateAsync(req.body);
    } catch (err) {
        const error = err as ValidationError;
        res.status(400).send(
            new ErrorResponse(
                'Invalid recipe receieved',
                error.details[0].message
            )
        );
    }

    logger.info('Creating new recipe');
};
