import { Recipe } from '../models/recipe';
import { PersistedRecipe, MongoRecipe } from './recipeSchema';

/**
 * Save a recipe to MongoDB
 * @param newRecipe the recipe to be saved
 */
export async function create(newRecipe: Recipe): Promise<PersistedRecipe> {
    const recipeToSave = new MongoRecipe({
        ...newRecipe,
    });

    const savedRecipe = await recipeToSave.save();

    return savedRecipe;
}
