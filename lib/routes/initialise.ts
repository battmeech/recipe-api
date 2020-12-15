import { Express } from 'express';
import { logger } from '../logger';
import create from './create';
import list from './list';

export function initialiseRoutes(app: Express) {
    logger.info('Initialising routes');

    app.post('/recipe', create);

    app.get('/recipe/:id', async (req, res) => {});

    app.put('/recipe/:id', async (req, res) => {});

    app.delete('/recipe/:id', async (req, res) => {});

    app.get('/recipe', list);

    app.delete('/clean', async (req, res) => {});

    logger.info('Routes initialised successfully');
}
