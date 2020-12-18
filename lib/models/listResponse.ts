import { Recipe } from './recipe';

/**
 * The response when requesting a recipe
 */
export type ListResponse = {
    recipes: ListRecipe[];
    pageToken: string;
};

/**
 * How the recipe is displayed in a list
 */
export class ListRecipe {
    id: string;
    name: string;
    serves: number;
    prepTime: number;
    cookingTime: number;
    description: string;
    difficulty: string;

    constructor(recipe: Recipe, id: string) {
        this.id = id;
        this.name = recipe.name;
        this.serves = recipe.serves;
        this.prepTime = recipe.prepTime;
        this.cookingTime = recipe.cookingTime;
        this.description = recipe.description;
        this.difficulty = recipe.difficulty;
    }
}
