import { useSelector } from "react-redux";
import "./index.scss";
import Point from "../Point/Point";
import React from "react";

export default function Map() {
    const pointSizePx = useSelector((state) => state.map.pointSizePx);
    const field = useSelector((state) => state.map.field);
    const mapSize = useSelector((state) => state.config.size);

    const gridStyle = {
        gridTemplateColumns: `repeat(${mapSize}, ${pointSizePx}px)`,
    };

    const pointStyle = {
        width: `${pointSizePx}px`,
        height: `${pointSizePx}px`,
    };

    console.log("MAP RENDER");
    if (!field) return <h1>Configurate settings and save</h1>;
    //return <div>{JSON.stringify(map)}</div>;

    return (
        <ul className="map" style={gridStyle}>
            {field &&
                field.map((row, i) =>
                    row?.map((pointValue, j) => (
                        <Point
                            key={`${i}${j}`}
                            id={`${i}${j}`}
                            value={pointValue}
                            style={pointStyle}
                        />
                    ))
                )}
        </ul>
    );
}
