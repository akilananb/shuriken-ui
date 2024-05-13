import { render, screen } from "@testing-library/react";
import NavBar from "@/components/layout/navbar/";

describe("NavBar", () => {
  test("renders the navbar component", () => {
    render(<NavBar showDrawer={() => {}} />);

    // Assert that the hamburger button is rendered
    const hamburgerButton = screen.getByAltText("hamburger");
    expect(hamburgerButton).toBeInTheDocument();

    // Assert that the nomura logo is rendered
    const nomura = screen.getByAltText("nomura");
    expect(nomura).toBeInTheDocument();

    const nomuraLogo = screen.getByAltText("nomura logo");
    expect(nomuraLogo).toBeInTheDocument();

    // Assert that the shuriken logo is rendered
    const shurikenLogo = screen.getByAltText("shuriken logo");
    expect(shurikenLogo).toBeInTheDocument();

    // Assert that the shuriken notification button is rendered
  });

  it("renders the logo image with the correct class", () => {
    const { getByAltText } = render(<NavBar showDrawer={() => {}} />);
    const logo = getByAltText("nomura");
    const Nomura = getByAltText("nomura logo");
    const shuriken = getByAltText("shuriken logo");
    expect(logo).toHaveClass("h-[64px]");
    expect(Nomura).toHaveClass("h-[64px]");
    expect(shuriken).toHaveClass("h-[64px]");
  });
});
