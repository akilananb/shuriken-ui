import { NumberInputProps } from "./types";
import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import { toRemoveCommaFormat, toSetCommaFormat } from "@/_utils/stringUtils";
import TooltipComponent from "../tooltip";
import { useRouter } from "next/navigation";

const NumberInput: React.FC<NumberInputProps> = (props: NumberInputProps) => {
  const {
    onChangeListener,
    value,
    placeholder,
    className,
    selectedItem,
    isUpdate,
    ...rest
  } = props;
  const [numberValue, setNumberValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (value) {
      setNumberValue(toSetCommaFormat(value));
    }
  }, [value]);

  const handleNumberChange = (event) => {
    setNumberValue(toSetCommaFormat(event.target.value));
    onChangeListener?.(toRemoveCommaFormat(event.target.value));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (
        selectedItem?.pdpId !== undefined &&
        selectedItem?.securityType !== undefined
      ) {
        if (isUpdate) {
          router.push(
            `/bonds?pdpId=${selectedItem?.pdpId}&securityType=${selectedItem?.securityType}&quantity=${numberValue}`
          );
        } else {
          const url = `/shuriken/bonds?pdpId=${selectedItem?.pdpId}&securityType=${selectedItem?.securityType}&quantity=${numberValue}`;
          window.open(url, "_blank");
        }
      }
    }
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
          onKeyDown={handleKeyDown}
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
