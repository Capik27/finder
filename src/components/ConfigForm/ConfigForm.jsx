import "./index.scss";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    INPUT_SIZE_LIMIT_BOTTOM,
    INPUT_SIZE_LIMIT_TOP,
    INPUT_COEF_LIMIT,
    INPUT_SPEED_LIMIT,
    DEFAULT_FILL_COEF,
    FINISH,
    PLAYER,
} from "../../utils/consts";
import {
    setFillcoefValue,
    setMapSize,
    setWorkingValue,
} from "../../store/configSlice";

import { setPointValue } from "../../store/mapSlice";

import { setPlayerPosition, resetPlayer } from "../../store/playerSlice";
import generateRangedRndCoordinates from "../../utils/coordinates/generateRangedRndCoordinates";
import { generateMap } from "../../store/mapSlice";
import { setSpeed } from "../../store/configSlice";
import ConfigInput from "../ConfigInput/ConfigInput";
import { Button } from "@mui/material";
import React from "react";

export default function ConfigForm() {
    const dispatch = useDispatch();
    const [notGenerated, setNotGenerated] = useState(true);
    const config = useSelector((state) => state.config);
    const { size, fillcoef, speed } = config;
    const isStarted = config.working;

    const sizeRef = useRef();
    const coefRef = useRef();
    const speedRef = useRef();

    const handleSave = (e) => {
        e.preventDefault();
        //SIZE CHECK
        if (sizeRef.current.value < INPUT_SIZE_LIMIT_BOTTOM) {
            sizeRef.current.value = INPUT_SIZE_LIMIT_BOTTOM;
        } else if (sizeRef.current.value > INPUT_SIZE_LIMIT_TOP) {
            sizeRef.current.value = INPUT_SIZE_LIMIT_TOP;
        }
        sizeRef.current.value = Math.round(sizeRef.current.value);
        //COEF CHECK
        if (coefRef.current.value < 0) {
            coefRef.current.value = 0;
        } else if (coefRef.current.value > INPUT_COEF_LIMIT) {
            coefRef.current.value = INPUT_COEF_LIMIT;
        }
        // SPEED CHECK
        if (speedRef.current.value < 0) {
            speedRef.current.value = 0;
        } else if (speedRef.current.value > INPUT_SPEED_LIMIT) {
            speedRef.current.value = INPUT_SPEED_LIMIT;
        }
        speedRef.current.value = Math.round(speedRef.current.value);

        dispatch(setMapSize(sizeRef.current.value));
        dispatch(setFillcoefValue(coefRef.current.value));
        dispatch(setSpeed(speedRef.current.value));
        //GENERATE NEW MAP
        dispatch(
            generateMap({
                size: sizeRef.current.value,
                coef: coefRef.current.value,
            })
        );
        // GENERATE PLAYER & FINISH
        const playerPosition = generateRangedRndCoordinates(
            0,
            Math.round(DEFAULT_FILL_COEF * Number(sizeRef.current.value))
        );
        const finishPosition = generateRangedRndCoordinates(
            Math.round(DEFAULT_FILL_COEF * Number(sizeRef.current.value)) + 1,
            Number(sizeRef.current.value - 1)
        );

        // console.log(
        //     "playerPosition",
        //     playerPosition,
        //     "finishPosition",
        //     finishPosition
        // );

        dispatch(resetPlayer());
        dispatch(setPlayerPosition(playerPosition));
        dispatch(setPointValue({ coords: playerPosition, value: PLAYER }));
        dispatch(setPointValue({ coords: finishPosition, value: FINISH }));

        // ENABLE START BUTTON
        if (notGenerated) setNotGenerated(false);
    };

    const handleClick = () => {
        dispatch(setWorkingValue(!isStarted));
    };

    return (
        <form className="configForm" onSubmit={handleSave}>
            <ConfigInput
                inputRef={sizeRef}
                defaultValue={size}
                disabled={isStarted}
                label={"Size: 8-100"}
                variant="outlined"
            />
            <ConfigInput
                inputRef={coefRef}
                defaultValue={fillcoef}
                disabled={isStarted}
                label={"Fillcoef: 0-1"}
                variant="outlined"
            />
            <ConfigInput
                inputRef={speedRef}
                defaultValue={speed}
                disabled={isStarted}
                label={"Speed: ms"}
                variant="outlined"
            />
            <Button
                variant="contained"
                disabled={isStarted}
                onClick={handleSave}
                type="submit"
            >
                Save
            </Button>

            <Button
                variant="contained"
                color={isStarted ? "error" : "success"}
                disabled={notGenerated}
                onClick={handleClick}
            >
                {isStarted ? "Stop" : "Start"}
            </Button>
        </form>
    );
}
