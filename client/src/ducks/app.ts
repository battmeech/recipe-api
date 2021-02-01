import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// State Type
export type AppState = {
    errorOpen: boolean;
    isMobile: boolean;
    isTop: boolean;
};

// Setup initial app state
const initialState: AppState = {
    errorOpen: false,
    isMobile: false,
    isTop: true,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openError(state) {
            state.errorOpen = true;
        },
        closeError(state) {
            state.errorOpen = false;
        },
        setIsMobile(state, payload: PayloadAction<boolean>) {
            state.isMobile = payload.payload;
        },
        setIsTop(state, payload: PayloadAction<boolean>) {
            state.isTop = payload.payload;
        },
    },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
