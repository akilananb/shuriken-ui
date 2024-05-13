import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Index from "@/components/common/Banner_img";

describe("Index", () => {
  it("renders without crashing", () => {
    render(<Index src="test.jpg" />);
  });

  it("renders the image", () => {
    const { getByAltText } = render(<Index src="test.jpg" />);
    expect(getByAltText("Banner Img")).toBeInTheDocument();
  });

  it("renders the image with the correct class", () => {
    const { getByRole } = render(
      <Index src="test.jpg" className="testClass" />
    );
    expect(getByRole("img")).toHaveClass("testClass");
  });
});
