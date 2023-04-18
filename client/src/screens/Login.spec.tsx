import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Login from "../screens/Login";

describe("Login", () => {
  it("renders a button", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Login />
      </MockedProvider>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
