import { Recipe } from './recipe';

export type ListResponse = {
    recipes: ListRecipe[];
    total: number;
    pageToken: string;
};

export class ListRecipe {
    id: string;
    name: string;
    serves: number;
    prepTime: string;
    cookingTime: string;
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
