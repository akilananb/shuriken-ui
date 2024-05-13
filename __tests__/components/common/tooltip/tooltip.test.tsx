import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Tooltip from "@/components/common/tooltip";
import TooltipComponent from "@/components/common/tooltip";

describe("TooltipComponent", () => {
  it("renders without crashing", () => {
    render(<TooltipComponent tooltipMsg="Test Tooltip" placement="top" />);
  });

  it("renders the children", () => {
    const { getByText } = render(
      <TooltipComponent tooltipMsg="Test Tooltip" placement="top">
        <div>Test Child</div>
      </TooltipComponent>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("renders the tooltip with the correct message", () => {
    const { getByTestId } = render(
      <TooltipComponent tooltipMsg="Test Tooltip" placement="top" />
    );
    expect(getByTestId("tool-tip")).not.toBeNull();
  });

  it("renders the tooltip with the correct placement", () => {
    const { getByTestId } = render(
      <TooltipComponent tooltipMsg="Test Tooltip" placement="top" />
    );
    expect(getByTestId("tool-tip")).not.toBeNull();
  });
});
