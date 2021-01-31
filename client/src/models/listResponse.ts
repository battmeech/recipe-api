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
export type ListRecipe = {
    slug: string;
    name: string;
    serves: number;
    prepTime: number;
    cookingTime: number;
    description: string;
    difficulty: string;
};
