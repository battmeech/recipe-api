import { Recipe } from '../models/recipe';
import { PersistedRecipe, MongoRecipe } from './recipeSchema';

export async function create(newRecipe: Recipe): Promise<PersistedRecipe> {
    const recipeToSave = new MongoRecipe({
        ...newRecipe,
    });

    const savedRecipe = await recipeToSave.save();

    return savedRecipe;
}
