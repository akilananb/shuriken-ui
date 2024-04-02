import { BaseElementAttributes } from "@/_utils/base";

export type InputType = "NUMBER_WITH_COMMA";
export interface BaseInputProps extends BaseElementAttributes {
  inputtype: InputType;
  placeholder?: string;
  value?: string;
  onChangeListener?: (value: string) => void;
  selectedItem?: HeaderData | null
}

export interface NumberInputProps extends BaseInputProps {
  inputtype: "NUMBER_WITH_COMMA";
  selectedItem?: HeaderData | null
}
export interface HeaderData {
  isin?: string;
  securityType: string | undefined;
}
export type InputProps = NumberInputProps;
