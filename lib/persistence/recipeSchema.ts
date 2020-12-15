import mongoose, { Document, Model } from 'mongoose';
import { Recipe } from '../models/recipe';

export type PersistedRecipe = Document & Recipe;

export interface PersistedRecipeModel extends Model<PersistedRecipe> {
    findRecipeById(id: string): Promise<PersistedRecipe>;
}

const MongoIncredientSchema = new mongoose.Schema({
    name: { type: String },
    quantityType: { type: String },
    quantity: { type: Number },
});

const MongoMethodSchema = new mongoose.Schema({
    number: { type: Number },
    instruction: { type: String },
});

const MongoRecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serves: { type: Number },
    ingredients: [MongoIncredientSchema],
    method: [MongoMethodSchema],
    prepTime: { type: String },
    cookingTime: { type: String },
    description: { type: String },
    difficulty: { type: String },
});

export const MongoRecipe = mongoose.model<
    PersistedRecipe,
    PersistedRecipeModel
>('Recipe', MongoRecipeSchema);
