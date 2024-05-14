import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Button from "@/components/common/button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(
      <Button
        text="Test"
        icon={undefined}
        onClick={undefined}
        className={undefined}
      />
    );
  });

  it("renders the text", () => {
    const { getByText } = render(
      <Button
        text="Test"
        icon={undefined}
        onClick={undefined}
        className={undefined}
      />
    );
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("renders the icon when provided", () => {
    const icon = <span data-testid="icon">Icon</span>;
    const { getByTestId } = render(
      <Button
        icon={icon}
        text={undefined}
        onClick={undefined}
        className={undefined}
      />
    );
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button
        text="Test"
        onClick={onClick}
        icon={undefined}
        className={undefined}
      />
    );
    fireEvent.click(getByText("Test"));
    expect(onClick).toHaveBeenCalled();
  });

  it("applies the className", () => {
    const { getByText } = render(
      <Button
        text="Test"
        className="test-class"
        icon={undefined}
        onClick={undefined}
      />
    );
    expect(getByText("Test")).toHaveClass("test-class");
  });
});
