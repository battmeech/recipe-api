import { Request, Response } from 'express';
import { ListRequest } from '../models/listRequest';
import { ListRecipe, ListResponse } from '../models/listResponse';
import { RecipeModel } from '../persistence/recipeSchema';
import { constructQuery } from '../utils/query';

export default async (req: Request, res: Response) => {
    const query = constructQuery(req.body);

    const results = await RecipeModel.find(query)
        .sort({
            [req.body.sort?.sortBy ?? 'updatedAt']:
                req.body.sort?.sortDirection ?? 'asc',
        })
        .limit(req.body.numberOfResults ?? 10);

    const response: ListResponse = {
        recipes: results.map(result => new ListRecipe(result, result._id)),
        pageToken: results?.length > 0 ? results[results.length - 1]._id : '',
    };

    res.status(200).send(response);
};
