import { BaseElementAttributes } from "@/_utils/base";

export type InputType = "NUMBER_WITH_COMMA" | "TEXT";
export interface BaseInputProps extends BaseElementAttributes {
  inputtype: InputType;
  placeholder?: string;
  value?: string;
  onChangeListener?: (value: string) => void;
  selectedItem?: HeaderData | null;
  isUpdate: boolean;
}

export interface NumberInputProps extends BaseInputProps {
  inputtype: "NUMBER_WITH_COMMA";
  selectedItem?: HeaderData | null;
}

export interface TextInputProps extends BaseInputProps {
  inputtype: "TEXT";
}

export interface HeaderData {
  isin?: string;
  securityType: string | undefined;
}
export type InputProps = NumberInputProps | TextInputProps;
