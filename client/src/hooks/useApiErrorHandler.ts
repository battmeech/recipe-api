import { appActions } from 'ducks/app';
import { RecipeApiError } from 'models/error';
import { LoadingStatus } from 'models/loadingStatus';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function useApiErrorHandler(
    loadingStatus: LoadingStatus,
    error: RecipeApiError | undefined,
    redirect = true
) {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('running');
        if (loadingStatus === 'Failed') {
            if (error!.status === 404) {
                if (redirect) history.push('/404');
                else dispatch(appActions.openError());
            } else {
                if (redirect) history.push('/');
                else dispatch(appActions.openError());
            }
        }
    }, [loadingStatus, dispatch, error, redirect, history]);
}
