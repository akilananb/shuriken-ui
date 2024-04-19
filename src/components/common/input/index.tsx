import NumberInput from "./number_input";
import TextInput from "./text_input";
import { BaseInputProps, NumberInputProps, TextInputProps } from "./types";

const InputComponent: React.FC<BaseInputProps> = (props: BaseInputProps) => {
  const { inputtype } = props;

  switch (inputtype) {
    case "NUMBER_WITH_COMMA":
      return <NumberInput {...(props as NumberInputProps)} />;
    case "TEXT":
      return <TextInput {...(props as TextInputProps)} />;
    default:
      return <div>No data</div>;
  }
};

export default InputComponent;
