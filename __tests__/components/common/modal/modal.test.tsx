import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Modal from "@/components/common/modal";

describe("Modal", () => {
  it("renders without crashing", () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="" children={undefined} />
    );
  });

  it("does not render when isOpen is false", () => {
    const { queryByRole } = render(
      <Modal isOpen={false} onClose={() => {}} title="" children={undefined} />
    );
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={() => {}} title="" children={undefined} />
    );
    expect(getByRole("dialog")).toBeInTheDocument();
  });

  it("renders the title", () => {
    const { getByText } = render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Modal Title"
        children={undefined}
      />
    );
    expect(getByText("Modal Title")).toBeInTheDocument();
  });

  it("renders the children", () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}} title={undefined}>
        <div>Child Component</div>
      </Modal>
    );
    expect(getByText("Child Component")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = jest.fn();
    const { getByAltText } = render(
      <Modal isOpen={true} onClose={onClose} title="" children={undefined} />
    );
    fireEvent.click(getByAltText("close"));
    expect(onClose).toHaveBeenCalled();
  });
});
