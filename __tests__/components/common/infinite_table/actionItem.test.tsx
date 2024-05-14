import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ActionItem from "@/components/common/infinte_table/actionItem";
import { BASE_NAME } from "@/config/appConfig";

describe("ActionItem", () => {
  it("renders without crashing", () => {
    render(<ActionItem actionType="Edit" onClick={() => {}} />);
  });

  it("renders the correct icon for the Edit action", () => {
    const { getByAltText } = render(
      <ActionItem actionType="Edit" onClick={jest.fn()} />
    );
    expect(getByAltText("Logo")).toHaveAttribute(
      "src",
      `${BASE_NAME}/static/images/editIcon.svg`
    );
  });

  it("renders the correct icon for the Delete action", () => {
    const { getByAltText } = render(
      <ActionItem actionType="Delete" onClick={jest.fn()} />
    );
    expect(getByAltText("Logo")).toHaveAttribute(
      "src",
      `${BASE_NAME}/static/images/deleteIcon.svg`
    );
  });

  it("calls onClick when the button is clicked", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ActionItem actionType="Edit" onClick={onClick} />
    );
    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
