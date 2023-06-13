import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import UserContext from "../auth/UserContext";
import PrivateRoute from "./PrivateRoute";

// Mock the UserContext
const mockUserContextValue = {
  currentUser: { username: "testuser" }
};

function Wrapper({ children }) {
  return (
    <MemoryRouter>
      <UserContext.Provider value={mockUserContextValue}>
        {children}
      </UserContext.Provider>
    </MemoryRouter>
  );
}

it("renders without crashing", function () {
  render(
    <Wrapper>
      <PrivateRoute/>
    </Wrapper>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Wrapper>
      <PrivateRoute />
    </Wrapper>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: null }}>
        <PrivateRoute />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
