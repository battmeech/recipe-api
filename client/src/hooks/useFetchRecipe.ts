import { fetchRecipeById } from 'ducks/recipe';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRecipeState } from './useRecipeState';

export function useFetchRecipe(recipeSlug: string) {
    const recipeState = useRecipeState();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecipeById(recipeSlug));
    }, [recipeSlug, dispatch]);

    return recipeState;
}
