import { configureStore, combineReducers } from "@reduxjs/toolkit";
import configSlice from "./configSlice";
import mapSlice from "./mapSlice";
import playerSlice from "./playerSlice";

const rootReducer = combineReducers({
    config: configSlice,
    map: mapSlice,
    player: playerSlice,
});

export const store = configureStore({ reducer: rootReducer });
