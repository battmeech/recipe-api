import { RecipeState } from 'ducks/recipe';
import { RootState } from 'ducks/store';
import { useSelector } from 'react-redux';

/**
 * Quick wrapper function around useSelector to get the recipe slice state
 */
export function useRecipeState(): RecipeState {
    const appState = useSelector<RootState, RecipeState>(
        (state) => state.recipe
    );
    return appState;
}
