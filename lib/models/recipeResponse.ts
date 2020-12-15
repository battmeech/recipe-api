import { PersistedRecipe } from '../persistence/recipeSchema';
import { Ingredient } from './ingredient';
import { Instruction } from './instruction';
import { Recipe } from './recipe';

/**
 * The Recipe as it is returned to the user
 */
export class RecipeResponse extends Recipe {
    id: string;

    constructor(recipe: PersistedRecipe) {
        super();
        this.id = recipe._id;
        this.name = recipe.name;
        this.serves = recipe.serves;
        this.ingredients = recipe.ingredients.map(
            ingredient => new Ingredient(ingredient)
        );
        this.method = recipe.method.map(
            instruction => new Instruction(instruction)
        );
        this.prepTime = recipe.prepTime;
        this.cookingTime = recipe.cookingTime;
        this.description = recipe.description;
        this.difficulty = recipe.difficulty;
    }
}
