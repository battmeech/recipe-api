import { createSlice } from '@reduxjs/toolkit';

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
        isMobile(state) {
            state.isMobile = true;
        },
        isNotMobile(state) {
            state.isMobile = false;
        },
        isTop(state) {
            state.isTop = true;
        },
        isNotTop(state) {
            state.isTop = false;
        },
    },
});

export const actions = appSlice.actions;

export default appSlice.reducer;
