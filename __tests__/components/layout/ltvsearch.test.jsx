import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import LtvSearch from "@/components/layout/ltvsearch";

describe("LtvSearch", () => {
  it("renders the LtvSearch component", () => {
    render(<LtvSearch />);
  });

  it("renders without crashing", async () => {
    const { getByTestId } = render(<LtvSearch />);
    const autocomplete = getByTestId("autocomplete-input");

    fireEvent.focus(autocomplete);

    const input = await screen.findByTestId("autocomplete-input");
    expect(input).toBeInTheDocument();
  });
});
