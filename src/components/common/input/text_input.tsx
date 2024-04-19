import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { TextInputProps } from "./types";

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  const { placeholder, onChangeListener, value } = props;

  const handleInputChange = (event) => {
    onChangeListener?.(event.target.value);
  };

  return (
    <TextField
      fullWidth
      multiline
      rows={7}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#D1D3D4",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#D1D3D4",
          },
        },
      }}
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default TextInput;
