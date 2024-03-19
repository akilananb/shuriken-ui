import { BaseElementAttributes } from "@/_utils/base";

export type InputType = "NUMBER_WITH_COMMA";
export interface BaseInputProps extends BaseElementAttributes {
  inputtype: InputType;
  placeholder?: string;
  value?: string;
  onChangeListener?: (value: string) => void;
}

export interface NumberInputProps extends BaseInputProps {
  inputtype: "NUMBER_WITH_COMMA";
}
export type InputProps = NumberInputProps;
