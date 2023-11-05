import React from "react";
import ConfigForm from "../ConfigForm/ConfigForm";
import Map from "../Map/Map";
import "./index.scss";
//import useTimedStep from "../../hooks/useTimedStep";

function App() {
    //useTimedStep();

    return (
        <>
            <ConfigForm />
            <Map />
        </>
    );
}

export default App;
