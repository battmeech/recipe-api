import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

/**
 * The basic recipe model
 */
export type Recipe = {
    name: string;
    serves: number;
    ingredients: Ingredient[];
    method: Instruction[];
    prepTime: string;
    cookingTime: string;
    description: string;
    difficulty: string;
};
