import { createSlice } from "@reduxjs/toolkit";
import {
    // DEFAULT_FILL_COEF,
    // DEFAULT_SIZE_NUMBER,
    DEFAULT_GAP_SIZE_PX,
    DEFAULT_POINT_SIZE_PX,
} from "../utils/consts";
import createMap from "../utils/coordinates/createMap";

const initialState = {
    field: undefined, //createMap(DEFAULT_SIZE_NUMBER, DEFAULT_FILL_COEF),
    pointSizePx: DEFAULT_POINT_SIZE_PX,
    gapSizePx: DEFAULT_GAP_SIZE_PX,
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        resetMap(state) {
            state.field = initialState.field;
        },
        generateMap(state, action) {
            const { size, coef } = action.payload;
            state.field = createMap(+size, +coef);

            let sizeIdx = Math.round(+size / 10);
            sizeIdx = sizeIdx > 1 ? sizeIdx : 0;
            state.pointSizePx = DEFAULT_POINT_SIZE_PX - sizeIdx;
        },
        setPointValue(state, action) {
            const { coords, value } = action.payload;
            state.field[coords[1]][coords[0]] = value;
        },
    },
});

export default mapSlice.reducer;
export const { resetMap, generateMap, setPointValue } = mapSlice.actions;
