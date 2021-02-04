import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeApiError } from 'models/error';

export const fetchRecipeById = createAsyncThunk(
    'recipe/fetchRecipeById',
    async (recipeSlug: string): Promise<Object> => {
        try {
            return await axios.get<Object>(`/api/recipe/${recipeSlug}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                const recipeError: RecipeApiError = {
                    status: error.response.data.status,
                    message: error.response.data.message,
                    details: error.response.data.details,
                };
                throw recipeError;
            } else {
                throw error;
            }
        }
    }
);

// State Type
export type RecipeState =
    | {
          recipe: undefined;
          loadingStatus: 'Failed';
          error: Object;
      }
    | {
          recipe: undefined;
          loadingStatus: 'In progress' | 'Not started';
          error: undefined;
      }
    | {
          recipe: Object;
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
                (state, action: PayloadAction<Object>) => {
                    state.loadingStatus = 'Complete';
                    state.recipe = action.payload;
                    state.error = undefined;
                }
            )
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.loadingStatus = 'Failed';
                state.error = action.error;
                state.recipe = undefined;
            });
    },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;
