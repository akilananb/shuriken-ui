import NumberInput from "./number_input";
import { BaseInputProps } from "./types";

const InputComponent: React.FC<BaseInputProps> = (props: BaseInputProps) => {
  const { inputtype } = props;

  switch (inputtype) {
    case "NUMBER_WITH_COMMA":
      return <NumberInput {...props} />;
    default:
      return <div>No data</div>;
  }
};

export default InputComponent;
