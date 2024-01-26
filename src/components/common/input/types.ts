export type InputType = "NUMBER_WITH_COMMA";
export interface BaseInputProps {
  inputType: InputType;
}

export interface NumberInputProps extends BaseInputProps {
  inputType: "NUMBER_WITH_COMMA";
}
export type InputProps = NumberInputProps;

// type HeaderTypes = "HEADER_WITH_BACK" | "HEADER_WITH_CLOSE";

// interface HeaderBase extends PropsWithChildren {
//   headerType: HeaderTypes;
//   title: string;
//   onBackListener?: (isClicked: boolean) => void;
//   onCloseListener?: (isClicked: boolean) => void;
// }
// interface HeaderWithBack extends Omit<HeaderBase, "onCloseListener"> {
//   headerType: "HEADER_WITH_BACK";
// }
// interface HeaderWithClose extends Omit<HeaderBase, "onBackListener"> {
//   headerType: "HEADER_WITH_CLOSE";
// }
// export type HeaderComponentProps = HeaderWithBack | HeaderWithClose;
