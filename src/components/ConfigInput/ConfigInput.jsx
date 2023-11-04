import "./index.scss";
import React from "react";
//{ useState }
import TextField from "@mui/material/TextField";

export default function ConfigInput(props) {
    // const [value, setValue] = useState(props.defaultValue);

    // const handleChange = (e) => {
    //     setValue(e.target.value);
    // };

    return (
        <>
            <TextField
                className="configInput"
                helperText={props.label}
                inputRef={props.inputRef}
                disabled={props.disabled}
                defaultValue={props.defaultValue}
                size="small"
                type="number"
                variant="outlined"
                //onChange={handleChange}
                autoComplete="off"
            />
        </>
    );
}
