import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CardHeader from "@/components/common/Bonds/CardHeader";

describe("CardHeader", () => {
  it("renders without crashing", () => {
    render(<CardHeader header="Test Header" />);
  });

  it("renders the header text", () => {
    const { getByText } = render(<CardHeader header="Test Header" />);
    expect(getByText("Test Header")).toBeInTheDocument();
  });

  it("renders the header with the correct class", () => {
    const { getByText } = render(<CardHeader header="Test Header" />);
    expect(getByText("Test Header")).toHaveClass("nomura-16px-bold");
  });
});
