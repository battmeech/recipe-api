import { Ingredient } from './ingredient';
import { Instruction } from './instruction';
import { Recipe } from './recipe';

/**
 * The Recipe as it is returned to the user
 */
export class RecipeResponse implements Recipe {
    slug: string;
    name: string;
    serves: number;
    ingredients: Ingredient[];
    method: Instruction[];
    prepTime: number;
    cookingTime: number;
    description: string;
    difficulty: string;
    updatedAt: Date;

    constructor(recipe: Recipe, id: string, updatedAt: Date) {
        this.slug = id;
        this.name = recipe.name;
        this.serves = recipe.serves;
        this.ingredients = recipe.ingredients.map(
            (ingredient) => new Ingredient(ingredient)
        );
        this.method = recipe.method.map(
            (instruction) => new Instruction(instruction)
        );
        this.prepTime = recipe.prepTime;
        this.cookingTime = recipe.cookingTime;
        this.description = recipe.description;
        this.difficulty = recipe.difficulty;
        this.updatedAt = updatedAt;
    }
}
