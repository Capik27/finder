import { createSlice } from "@reduxjs/toolkit";
import { PATTERNS } from "../utils/consts";

const initialState = {
    position: [],
    prevpos: undefined,
    patterns: PATTERNS,
    steps: [],
    stepsPath: {},
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        resetPlayer(state) {
            state.position = initialState.position;
            state.prevpos = initialState.prevpos;
            state.steps = initialState.steps;
            state.stepsPath = initialState.stepsPath;
        },
        setPlayerPosition(state, action) {
            state.position = action.payload;
        },
        setPrevPosition(state, action) {
            state.prevpos = action.payload;
        },
        addStep(state, action) {
            state.steps.push(action.payload);
        },
        addStepPath(state, action) {
            const { position, hash } = action.payload;
            state.stepsPath[String(position)] = hash;
        },
    },
});

export default playerSlice.reducer;
export const {
    resetPlayer,
    setPlayerPosition,
    setPrevPosition,
    addStep,
    addStepPath,
} = playerSlice.actions;
