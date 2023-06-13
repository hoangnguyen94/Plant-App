import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Navigation from "./Navigation";

// Mock the UserContext
const mockUserContextValue = {
  currentUser: { username: "testuser" }
};

// Mock the logout function
const mockLogout = jest.fn();

describe("Navigation", () => {
  it("renders navigation for logged in user", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={mockUserContextValue}>
          <Navigation logout={mockLogout} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Assert that the navigation for logged-in user matches the snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders navigation for logged out user", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: null }}>
          <Navigation logout={mockLogout} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Assert that the navigation for logged-out user matches the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
