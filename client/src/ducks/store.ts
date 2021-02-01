import { configureStore } from '@reduxjs/toolkit';
import app from 'ducks/app';

const store = configureStore({
    reducer: {
        app,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
