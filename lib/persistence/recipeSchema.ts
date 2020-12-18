import mongoose, { Document } from 'mongoose';
import { Recipe } from '../models/recipe';

const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

export type PersistedRecipe = Document &
    Recipe & { updatedAt: Date; slug: string };

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
    slug: { type: String, slug: 'name', unique: true },
    updatedAt: { type: Date, required: true },
    serves: { type: Number },
    ingredients: [IncredientSchema],
    method: [MethodSchema],
    prepTime: { type: Number },
    cookingTime: { type: Number },
    description: { type: String },
    difficulty: { type: String },
});

export const RecipeModel = mongoose.model<PersistedRecipe>(
    'Recipe',
    RecipeSchema
);
