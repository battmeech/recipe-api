import { Request, Response } from 'express';
import { ListRecipe, ListResponse } from '../models/listResponse';
import { RecipeModel } from '../persistence/recipeSchema';

export type ListRequest = {
    startFrom?: string;
    sort?: {
        sortBy: 'difficulty' | 'createdAt' | 'name';
        sortDirection: 'asc' | 'desc';
    };
    numberOfResults?: number;
};

export default async (req: Request, res: Response) => {
    const total = await RecipeModel.estimatedDocumentCount();

    const body: ListRequest = req.body;

    const results = await RecipeModel.find(
        body.startFrom && { _id: { $gt: body.startFrom } }
    )
        .sort({
            [body.sort?.sortBy ?? 'createdAt']:
                body.sort?.sortDirection ?? 'asc',
        })
        .limit(body.numberOfResults ?? 10);

    const response: ListResponse = {
        total,
        recipes: results.map(result => new ListRecipe(result, result._id)),
    };

    res.status(200).send(response);
};
