import { BaseDivAttributes } from "@/_utils/base";
import { HTMLAttributes } from "react";

export type InputType = "NUMBER_WITH_COMMA";
export interface BaseInputProps extends BaseDivAttributes {
  inputType: InputType;
  placeholder?: string;
  value?: string;
  onChangeListener?: (value?: string) => void;
}

export interface NumberInputProps extends BaseInputProps {
  inputType: "NUMBER_WITH_COMMA";
}
export type InputProps = NumberInputProps;
