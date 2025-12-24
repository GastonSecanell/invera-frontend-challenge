import { render, screen } from "@testing-library/react";
import StatusBadge from "../StatusBadge";

describe("StatusBadge", () => {
  it("renders Online status", () => {
    render(<StatusBadge status="Online" />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("renders Offline status", () => {
    render(<StatusBadge status="Offline" />);
    expect(screen.getByText("Offline")).toBeInTheDocument();
  });
});

