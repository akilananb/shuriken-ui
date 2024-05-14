import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import InputComponent from "@/components/common/input";

describe("InputComponent", () => {
  it("renders without crashing", () => {
    render(<InputComponent inputtype="NUMBER_WITH_COMMA" />);
  });
});
