import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BrandLogoFull from "@/components/common/brand_logo_full";

describe("BrandLogoFull", () => {
  it("renders without crashing", () => {
    render(<BrandLogoFull />);
  });

  it("renders the logo image", () => {
    const { getByAltText } = render(<BrandLogoFull />);
    expect(getByAltText("Logo")).toBeInTheDocument();
  });

  it("renders the logo image with the correct dimensions", () => {
    const { getByAltText } = render(<BrandLogoFull />);
    const logo = getByAltText("Logo");
    expect(logo).toHaveAttribute("width", "88");
    expect(logo).toHaveAttribute("height", "16");
  });
});
