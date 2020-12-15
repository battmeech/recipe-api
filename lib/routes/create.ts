import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '../logger';
import { ErrorResponse } from '../models/errorResponse';

export default async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send(
            new ErrorResponse(
                'Invalid request body',
                // We only want the first error message
                errors.array({ onlyFirstError: true })[0].msg
            )
        );
    } else {
        logger.info('Creating new recipe');

        res.status(200).send(req.body);
    }
};
