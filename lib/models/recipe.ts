import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

/**
 * The basic recipe model
 */
export class Recipe {
    name: string;
    serves: number;
    ingredients: Ingredient[];
    method: Instruction[];
    prepTime: string;
    cookingTime: string;
    description: string;
    difficulty: string;

    constructor() {
        this.name = '';
        this.serves = 0;
        this.ingredients = [];
        this.method = [];
        this.prepTime = '';
        this.cookingTime = '';
        this.description = '';
        this.difficulty = '';
    }
}
