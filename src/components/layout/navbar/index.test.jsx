import { describe, beforeEach, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import NavBar from "@components/layout/navbar";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

const mockShowDrawer = vi.fn();

describe("NavBar", () => {
  beforeEach(() => {
    // Wrap NavBar with BrowserRouter
    render(
      <BrowserRouter>
        <NavBar showDrawer={mockShowDrawer} />
      </BrowserRouter>
    );
  });

  it("should render the navbar", () => {
    expect(screen.getByTestId("shuriken-header")).toBeInTheDocument();
  });
  it("should render the hamburger icon", () => {
    expect(screen.getByTestId("shuriken-hamburger")).toBeInTheDocument();
  });
  it("onClick hamburger icon should should call showDrawer method", async () => {
    const hamburger = screen.getByTestId("shuriken-hamburger");
    fireEvent.click(hamburger);
    expect(mockShowDrawer).toHaveBeenCalled();
  });
  it("should render notification icon", async () => {
    expect(screen.getByTestId("shuriken-notification")).toBeInTheDocument();
  });
});
