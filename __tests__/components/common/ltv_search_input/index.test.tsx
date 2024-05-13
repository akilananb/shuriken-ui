import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SearchComponent from "@/components/common/ltv_search_input";

describe("SearchComponent", () => {
  it("renders without crashing", () => {
    render(<SearchComponent value={undefined} />);
  });
});
