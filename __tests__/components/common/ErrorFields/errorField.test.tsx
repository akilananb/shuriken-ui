import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ErrorField from "@/components/common/ErrorField";

describe("ErrorField", () => {
  it("renders without crashing", () => {
    render(<ErrorField errorMsg="Test Error" children={undefined} />);
  });

  it("renders the children", () => {
    const { getByText } = render(
      <ErrorField errorMsg="Test Error">
        <div>Test Child</div>
      </ErrorField>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("renders the error message", () => {
    const { getByText } = render(
      <ErrorField errorMsg="Test Error" children={undefined} />
    );
    expect(getByText("Test Error")).toBeInTheDocument();
  });
});
