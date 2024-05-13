import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LTVCalculationView from "@/components/common/ltv_search_input/ltv_calculator_view";

describe("LTVCalculatorView", () => {
  it("renders without crashing", () => {
    render(<LTVCalculationView loading="UNKNOWN" />);
  });
});
