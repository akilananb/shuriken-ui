import { NumberInputProps } from "./types";
import React, { useEffect, useState } from "react";

// import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";

const NumberInput: React.FC<NumberInputProps> = (props: NumberInputProps) => {
  const { onChangeListener, value, placeholder, className, ...rest } = props;
  const [numberValue, setNumberValue] = useState("");

  useEffect(() => {
    if (value) {
      setNumberValue(toSetCommaFormat(value));
    }
  }, [value]);

  const toSetCommaFormat = (value) => {
    return value
      .replace(/[^0-9\.]/g, "")
      .replace(/\./g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toRemoveCommaFormat = (value) => {
    return value
      .replace(/[^0-9\.]/g, "")
      .replace(/\./g, "")
      .replace(/\,/g, "");
  };

  const handleNumberChange = (event) => {
    setNumberValue(toSetCommaFormat(event.target.value));
    onChangeListener?.(toRemoveCommaFormat(event.target.value));
  };

  return (
    <div className={className}>
      <TextField
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D1D3D4",
            },
            "&:hover fieldset": {
              borderColor: "#D1D3D4",
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
    </div>
  );
};

export default NumberInput;
