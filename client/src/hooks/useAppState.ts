import { AppState } from 'ducks/app';
import { RootState } from 'ducks/store';
import { useSelector } from 'react-redux';

/**
 * Quick wrapper function around useSelector to get the app slice state
 */
export function useAppState(): AppState {
    const appState = useSelector<RootState, AppState>((state) => state.app);
    return appState;
}
