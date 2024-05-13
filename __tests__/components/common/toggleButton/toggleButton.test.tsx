import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ToggleButton from "@/components/common/toggleButton";

describe("ToggleButton", () => {
  it("renders without crashing", () => {
    render(<ToggleButton />);
  });

  it("renders the title", () => {
    const { getByText } = render(<ToggleButton title="Test Title" />);
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("calls the onCheckListener with the new checked state when clicked", () => {
    const onCheckListener = jest.fn();
    const { getByRole } = render(
      <ToggleButton onCheckListener={onCheckListener} />
    );
    fireEvent.click(getByRole("checkbox"));
    expect(onCheckListener).toHaveBeenCalledWith(true);
  });

  it("renders the checkbox with the correct checked state", () => {
    const { getByRole } = render(<ToggleButton isChecked={true} />);
    expect(getByRole("checkbox")).toBeChecked();
  });
});
