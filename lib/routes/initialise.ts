import { Express } from 'express';
import { logger } from '../logger';

export function initialiseRoutes(app: Express) {
    logger.info('Initialising routes');

    app.get('/recipe', async (req, res) => {
        res.status(200).send('You hit /recipe');
    });

    app.get('/recipe/:id', async (req, res) => {});

    app.post('/recipe', async (req, res) => {});

    app.put('/recipe/:id', async (req, res) => {});

    app.delete('/recipe/:id', async (req, res) => {});

    app.delete('/clean', async (req, res) => {});

    logger.info('Routes initialised successfully');
}
