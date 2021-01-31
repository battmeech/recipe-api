import { Express } from 'express';
import { logger } from '../logger';
import create from './create';
import list from './list';
import read from './read';
import update from './update';
import _delete from './delete';
import { RecipeModel } from '../persistence/recipeSchema';
import { Config } from '../config';

export function initialiseRoutes(app: Express) {
    logger.info('Initialising routes');

    app.post('/api/recipe', create);

    app.get('/api/recipe/:id', read);

    app.put('/api/recipe/:id', update);

    app.delete('/api/recipe/:id', _delete);

    app.post('/api/list', list);

    app.delete('/api/clean', async (req, res) => {
        if (Config.env === 'development') {
            logger.debug('Database being wiped');
            await RecipeModel.deleteMany({});
            res.status(200).send('Cleared DB');
        } else {
            res.status(404).send();
        }
    });

    logger.info('Routes initialised successfully');
}
