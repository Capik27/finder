import React, { useMemo } from "react";
import { TXTswap, TXTtypes } from "../../utils/consts";
import { useSelector } from "react-redux";
import { PLAYER, BORDER_PX } from "../../utils/consts";
import "./index.scss";
import useTimedStep from "../../hooks/useTimedStep";

export default function Player() {
    useTimedStep();
    // PLAYER
    const position = useSelector((state) => state.player.position);
    // SIZES
    const pointSizePx = useSelector((state) => state.map.pointSizePx);
    const gapSizePx = useSelector((state) => state.map.gapSizePx);

    const x = useMemo(() => position[0], [position]);
    const y = useMemo(() => position[1], [position]);
    const topShift = useMemo(() => {
        return pointSizePx * y + (y - 1) * gapSizePx + BORDER_PX;
    }, [gapSizePx, pointSizePx, y, BORDER_PX]);
    const leftShift = useMemo(() => {
        return pointSizePx * x + (x - 1) * gapSizePx + BORDER_PX;
    }, [gapSizePx, pointSizePx, x, BORDER_PX]);

    const playerStyle = {
        width: `${pointSizePx}px`,
        height: `${pointSizePx}px`,
        top: `${topShift}px`,
        left: `${leftShift}px`,
    };

    // console.log("player position", position);
    // console.log("x", x, "y", y);
    // console.log("topShift", topShift, "leftShift", leftShift);

    // console.log("gapSizePx", gapSizePx);
    // console.log("(x - 1) ", x - 1);

    return (
        <>
            <li className={`map__item_player PLAYER`} style={playerStyle}>
                {TXTtypes[TXTswap[PLAYER]]}
            </li>
        </>
    );
}
