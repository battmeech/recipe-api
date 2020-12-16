import mongoose, { Document } from 'mongoose';
import { Recipe } from '../models/recipe';

export type PersistedRecipe = Document & Recipe;

const IncredientSchema = new mongoose.Schema({
    name: { type: String },
    quantityType: { type: String },
    quantity: { type: Number },
});

const MethodSchema = new mongoose.Schema({
    number: { type: Number },
    instruction: { type: String },
});

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serves: { type: Number },
    ingredients: [IncredientSchema],
    method: [MethodSchema],
    prepTime: { type: String },
    cookingTime: { type: String },
    description: { type: String },
    difficulty: { type: String },
});

export const RecipeModel = mongoose.model<PersistedRecipe>(
    'Recipe',
    RecipeSchema
);
