import { Express } from 'express';
import { logger } from '../logger';
import { newRecipeRules } from '../validation/recipeValidation';
import create from './create';
import list from './list';

export function initialiseRoutes(app: Express) {
    logger.info('Initialising routes');

    app.get('/recipe', list);

    app.get('/recipe/:id', async (req, res) => {});

    app.post('/recipe', newRecipeRules, create);

    app.put('/recipe/:id', async (req, res) => {});

    app.delete('/recipe/:id', async (req, res) => {});

    app.delete('/clean', async (req, res) => {});

    logger.info('Routes initialised successfully');
}
