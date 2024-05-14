import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import InfiniteTable from "@/components/common/infinte_table/index";
import InfiniteScrollTable from "@/components/common/infinte_table/index";

describe("InfiniteScrollTable", () => {
  it("renders without crashing", () => {
    const props = {
      columns: [],
      fetchData: jest.fn(),
      disableScrollToTop: false,
      pageSize: 10,
      filters: {},
      reload: false,
      initialData: [],
      actionItems: [],
      actionOnClick: jest.fn(),
    };
    render(<InfiniteScrollTable {...props} />);
  });

  it("calls fetchData on initial render", () => {
    const fetchData = jest.fn();
    const props = {
      columns: [],
      fetchData,
      disableScrollToTop: false,
      pageSize: 10,
      filters: {},
      reload: false,
      initialData: [],
      actionItems: [],
      actionOnClick: jest.fn(),
    };
    render(<InfiniteScrollTable {...props} />);
    expect(fetchData).toHaveBeenCalled();
  });
});
