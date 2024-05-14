import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BondCards from "@/components/common/Bonds/BondCards";

describe("BondCards", () => {
  it("renders without crashing", () => {
    render(
      <BondCards
        header="Test Header"
        className={undefined}
        children={undefined}
      />
    );
  });

  it("renders the header", () => {
    const { getByText } = render(
      <BondCards
        header="Test Header"
        className={undefined}
        children={undefined}
      />
    );
    expect(getByText("Test Header")).toBeInTheDocument();
  });

  it("renders the children", () => {
    const { getByText } = render(
      <BondCards header="Test Header" className={undefined}>
        <div>Test Child</div>
      </BondCards>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("applies the className", () => {
    const { container } = render(
      <BondCards
        header="Test Header"
        className="test-class"
        children={undefined}
      />
    );
    expect(container.firstChild).toHaveClass("test-class");
  });
});
