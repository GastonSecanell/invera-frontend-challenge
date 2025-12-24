import { render, screen } from "@testing-library/react";
import UsersTableRow from "../UsersTableRow";
import { User } from "@/types/user";

const mockUser: User = {
  id: 1,
  name: "John Carter",
  email: "john@google.com",
  phone: "123",
  location: "USA",
  company: "Google",
  status: "Online",
};

describe("UsersTableRow", () => {
  it("renders user name and email", () => {
    render(
      <table>
        <tbody>
          <UsersTableRow
            user={mockUser}
            index={0}
            selected={false}
            onToggle={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            t={{ editUser: "Edit", deleteUser: "Delete" }}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("John Carter")).toBeInTheDocument();
    expect(screen.getByText("john@google.com")).toBeInTheDocument();
  });
});
