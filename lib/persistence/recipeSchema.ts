import mongoose, { Document, Model } from 'mongoose';
import { RecipeCreate } from '../models/recipe';

export type IRecipe = Document & RecipeCreate;

export interface IRecipeModel extends Model<IRecipe> {
    findRecipeById(id: string): Promise<IRecipe>;
}

const MongoIncredientSchema = new mongoose.Schema({
    name: { type: String },
    quantityType: { type: String },
    quantity: { type: Number },
});

const MongoMethodSchema = new mongoose.Schema({
    instructionNumber: { type: Number },
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

export const MongoRecipe = mongoose.model<IRecipe, IRecipeModel>(
    'Recipe',
    MongoRecipeSchema
);
