import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import NumberInput from "@/components/common/input/number_input";

describe("NumberInput", () => {
  it("renders without crashing", () => {
    render(<NumberInput inputtype={"NUMBER_WITH_COMMA"} />);
  });
});
