import { Express } from 'express';
import { logger } from '../logger';
import create from './create';
import list from './list';
import read from './read';
import update from './update';
import _delete from './delete';

export function initialiseRoutes(app: Express) {
    logger.info('Initialising routes');

    app.post('/recipe', create);

    app.get('/recipe/:id', read);

    app.put('/recipe/:id', update);

    app.delete('/recipe/:id', _delete);

    app.get('/recipe', list);

    app.delete('/clean', async (req, res) => {});

    logger.info('Routes initialised successfully');
}
