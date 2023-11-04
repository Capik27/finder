import React from "react";
import { TXTswap, TXTtypes } from "../../utils/consts";
import "./index.scss";

export default function Point(props) {
    return (
        <>
            <li
                className={`map__item_${TXTswap[props.value]}`}
                style={props.style}
            >
                {TXTtypes[TXTswap[props.value]]}
            </li>
        </>
    );
}
