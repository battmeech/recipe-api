import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export type Recipe = RecipeCreate & {
    id: string;
};

export type RecipeCreate = {
    name: string;
    serves: number;
    ingredients: Ingredient[];
    method: Instruction[];
    prepTime: string;
    cookingTime: string;
    description: string;
    difficulty: string;
};
