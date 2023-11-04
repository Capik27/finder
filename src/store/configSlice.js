import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_FILL_COEF, DEFAULT_SIZE_NUMBER, SPEED } from "../utils/consts";

const initialState = {
    size: DEFAULT_SIZE_NUMBER,
    limit: DEFAULT_SIZE_NUMBER - 1,
    fillcoef: DEFAULT_FILL_COEF,
    speed: SPEED,
    randomMode: true,
    working: false,
    victory: false,
};

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        resetConfig(state) {
            state = initialState;
        },
        setMapSize(state, action) {
            state.size = action.payload;
            state.limit = state.size - 1;
        },
        setWorkingValue(state, action) {
            state.working = action.payload;
        },
        setFillcoefValue(state, action) {
            state.fillcoef = action.payload;
        },
        setRandomMode(state, action) {
            state.randomMode = action.payload;
        },
        setSpeed(state, action) {
            state.speed = action.payload;
        },
        setVictory(state, action) {
            state.victory = action.payload;
        },
    },
});

export default configSlice.reducer;
export const {
    resetConfig,
    setMapSize,
    setWorkingValue,
    setFillcoefValue,
    setRandomMode,
    setSpeed,
    setVictory,
} = configSlice.actions;
