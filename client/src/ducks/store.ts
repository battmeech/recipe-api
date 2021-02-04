import { configureStore } from '@reduxjs/toolkit';
import app from 'ducks/app';
import recipe from 'ducks/recipe';

const store = configureStore({
    reducer: {
        app,
        recipe,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
