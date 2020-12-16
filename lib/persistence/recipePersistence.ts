import { ListRequest } from '../models/listRequest';
import { Recipe } from '../models/recipe';
import { PersistedRecipe, RecipeModel } from './recipeSchema';

/**
 * Save a recipe to MongoDB
 * @param newRecipe the recipe to be saved
 */
export async function create(
    newRecipe: Recipe,
    updatedAt: Date
): Promise<PersistedRecipe> {
    const recipeToSave = new RecipeModel({
        ...newRecipe,
        updatedAt,
    });

    const savedRecipe = await recipeToSave.save();

    return savedRecipe;
}

/**
 * Find a recipe in MongoDB
 * @param id the ID of the desired recipe
 * @returns null when the recipe does not exist
 */
export async function read(id: string): Promise<PersistedRecipe | null> {
    const mongoResponse = await RecipeModel.findById(id);

    return mongoResponse;
}

/**
 * Update a recipe in MongoDB
 * @param id the ID of the desired recipe
 * @param updatedRecipe the new recipe
 * @returns null when the recipe does not exist
 */
export async function update(
    id: string,
    updatedRecipe: Recipe,
    updatedAt: Date
): Promise<PersistedRecipe | null> {
    const persistedRecipe = await RecipeModel.findOneAndUpdate(
        { _id: id },
        { ...updatedRecipe, updatedAt }
    );

    return persistedRecipe;
}

/**
 * Remove a single recipe from the database
 * @param id the id of the recipe to be deleted
 */
export async function _delete(id: string): Promise<number> {
    const result = await RecipeModel.deleteOne({ _id: id });

    return result.deletedCount ?? 0;
}

/**
 * Get a list of recipes from the database based on certain criteria
 * @param query the query which will be sent to MongoDB
 * @param listRequest contains information around the sort direction and limit
 */
export async function list(
    query: any,
    listRequest: ListRequest
): Promise<PersistedRecipe[]> {
    const results = await RecipeModel.find(query)
        .sort({
            [listRequest.sort?.sortBy ?? 'updatedAt']:
                listRequest.sort?.sortDirection ?? 'asc',
        })
        .limit(listRequest.numberOfResults ?? 10);

    return results;
}
