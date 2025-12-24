import { render, screen } from "@testing-library/react";
import UserAvatar from "../UserAvatar";

describe("UserAvatar", () => {
  it("shows initial when not in demo mode", () => {
    render(<UserAvatar name="Alice" userId={1} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
