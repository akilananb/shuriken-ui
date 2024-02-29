import { NumberInputProps } from "./types";
import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import { toRemoveCommaFormat, toSetCommaFormat } from "@/_utils/stringUtils";
import TooltipComponent from "../tooltip";

const NumberInput: React.FC<NumberInputProps> = (props: NumberInputProps) => {
  const { onChangeListener, value, placeholder, className, ...rest } = props;
  const [numberValue, setNumberValue] = useState("");

  useEffect(() => {
    if (value) {
      setNumberValue(toSetCommaFormat(value));
    }
  }, [value]);

  const handleNumberChange = (event) => {
    setNumberValue(toSetCommaFormat(event.target.value));
    onChangeListener?.(toRemoveCommaFormat(event.target.value));
  };

  return (
    <div className={className}>
      <TooltipComponent tooltipMsg="Face value" placement="bottom">
        <TextField
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#D1D3D4",
              },
              "&:hover fieldset": {
                borderColor: "#d71133",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D1D3D4",
              },
            },
          }}
          placeholder={placeholder}
          variant="outlined"
          value={numberValue}
          onChange={handleNumberChange}
          type="text"
          inputProps={{ inputMode: "numeric" }} // Allow numeric input
          {...rest}
        />
      </TooltipComponent>
    </div>
  );
};

export default NumberInput;
