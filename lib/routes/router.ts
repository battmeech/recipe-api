import { Request, Response, Router } from 'express';
import { Config } from '../config';
import { logger } from '../logger';
import { RecipeModel } from '../persistence/recipeSchema';
import create from './create';
import _delete from './delete';
import list from './list';
import read from './read';
import update from './update';
import path from 'path';

export const router = Router();

router.route('/api/recipe').post(create);

router.route('/api/recipe/:id').get(read).put(update).delete(_delete);

router.route('/api/list').post(list);

if (Config.env === 'development') {
    router.route('/api/clear').delete(async (req: Request, res: Response) => {
        logger.debug('Database being wiped');
        await RecipeModel.deleteMany({});
        res.status(200).send('Cleared DB');
    });
}

if (Config.env === 'production') {
    router.use((req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });
}
