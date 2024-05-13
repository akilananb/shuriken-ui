import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddOverridePopup from "@/components/layout/add_override_popup";

describe("AddOverridePopup component", () => {
  it("renders component properly", () => {
    render(<AddOverridePopup />);

    expect(screen.getByTestId("open-modal-button")).toBeInTheDocument();
  });

  it("renders the button with correct text", () => {
    const { getByText } = render(<AddOverridePopup />);
    expect(getByText("Add Override")).toBeInTheDocument();
  });
});
