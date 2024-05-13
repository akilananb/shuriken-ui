import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Spinner from "@/components/common/spinner";

describe("Spinner", () => {
  it("renders without crashing", () => {
    render(<Spinner />);
  });

  it("renders the spinner", () => {
    const { getByTestId } = render(<Spinner data-testid="spinner" />);
    expect(getByTestId("spinner")).toBeInTheDocument();
  });

  it("applies the fullPageSpinner class when fullPage prop is true", () => {
    const { container } = render(<Spinner fullPage />);
    expect(container.firstChild).toHaveClass("fullPageSpinner");
  });

  it("does not apply the fullPageSpinner class when fullPage prop is false", () => {
    const { container } = render(<Spinner fullPage={false} />);
    expect(container.firstChild).not.toHaveClass("fullPageSpinner");
  });
});
