import { Recipe } from '../models/recipe';
import { PersistedRecipe, RecipeModel } from './recipeSchema';

/**
 * Save a recipe to MongoDB
 * @param newRecipe the recipe to be saved
 */
export async function create(newRecipe: Recipe): Promise<PersistedRecipe> {
    const recipeToSave = new RecipeModel({
        ...newRecipe,
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
    updatedRecipe: Recipe
): Promise<PersistedRecipe | null> {
    const persistedRecipe = await RecipeModel.findOneAndUpdate(
        { _id: id },
        updatedRecipe
    );

    return persistedRecipe;
}
