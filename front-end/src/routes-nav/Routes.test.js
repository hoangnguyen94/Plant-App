import React from "react";
import { render } from "@testing-library/react";
import Routes from "./Routes";
import { MemoryRouter } from "react-router";
import UserContext from "../auth/UserContext";

const mockUser = {
	email: "testing@test.com",
	firstName: "test",
	lastName: "test",
	isAdmin: false,
	username: "testing"
};
  
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: mockUser }}>
        <Routes />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: mockUser }}>
        <Routes />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
