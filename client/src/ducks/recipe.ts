import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeApiError } from 'models/error';
import { Recipe } from 'models/recipe';

export const fetchRecipeById = createAsyncThunk(
    'recipe/fetchRecipeById',
    async (recipeSlug: string, thunkApi) => {
        try {
            const { data } = await axios.get<Recipe>(
                `/api/recipe/${recipeSlug}`
            );
            return data;
        } catch (error) {
            if (error.response) {
                return thunkApi.rejectWithValue(error.response.data);
            } else {
                return thunkApi.rejectWithValue({
                    status: 500,
                    message: 'Server error',
                    details: 'Unable to contact server',
                });
            }
        }
    }
);

// State Type
export type RecipeState =
    | {
          recipe: undefined;
          loadingStatus: 'Failed';
          error: RecipeApiError;
      }
    | {
          recipe: undefined;
          loadingStatus: 'In progress' | 'Not started';
          error: undefined;
      }
    | {
          recipe: Recipe;
          loadingStatus: 'Complete';
          error: undefined;
      };

// Setup initial app state
const initialState: RecipeState = {
    recipe: undefined,
    loadingStatus: 'Not started',
    error: undefined,
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState: initialState as RecipeState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipeById.pending, (state) => {
                state.loadingStatus = 'In progress';
                state.error = undefined;
            })
            .addCase(
                fetchRecipeById.fulfilled,
                (state, action: PayloadAction<Recipe>) => {
                    state.loadingStatus = 'Complete';
                    state.recipe = action.payload;
                    state.error = undefined;
                }
            )
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.loadingStatus = 'Failed';
                state.error = action.payload as RecipeApiError;
                state.recipe = undefined;
            });
    },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;
