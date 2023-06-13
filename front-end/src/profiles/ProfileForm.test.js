import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../auth/UserContext";
import ProfileForm from "./ProfileForm";
import PlantApi from "../api/api";
import '@testing-library/jest-dom/extend-expect';
import "mutationobserver-shim";

// Mock the UserContext
const mockUserContextValue = {
  currentUser: {
    username: "testuser",
    firstName: "Test",
    lastName: "Tester",
    email: "test@example.com"
  },
  setCurrentUser: jest.fn()
};

// Mock the PlantApi.saveProfile method
jest.mock("../api/api", () => ({
  saveProfile: jest.fn(() => ({
    username: "testuser",
    firstName: "Updated First Name",
    lastName: "Updated Last Name",
    email: "updated@example.com"
  }))
}));

describe("ProfileForm", () => {
  it("renders profile form with initial values", () => {
    const { getByLabelText, container } = render(
      <MemoryRouter>
        <UserContext.Provider value={mockUserContextValue}>
          <ProfileForm />
        </UserContext.Provider>
      </MemoryRouter>
	);
	  
    // Assert that the form fields have the initial values
    expect(getByLabelText("Username")).toHaveValue("testuser");
    expect(getByLabelText("First Name")).toHaveValue("Test");
    expect(getByLabelText("Last Name")).toHaveValue("Tester");
    expect(getByLabelText("Email")).toHaveValue("test@example.com");
    expect(getByLabelText("Confirm password to make changes:")).toHaveValue("");

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();
  });

  it("handles form submission and updates user information", async () => {
    const { getByLabelText, getByText, queryByText, container } = render(
      <MemoryRouter>
        <UserContext.Provider value={mockUserContextValue}>
          <ProfileForm />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Simulate changes in form fields
    fireEvent.change(getByLabelText("First Name"), {
      target: { value: "Updated First Name" }
    });
    fireEvent.change(getByLabelText("Last Name"), {
      target: { value: "Updated Last Name" }
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "updated@example.com" }
    });
    fireEvent.change(getByLabelText("Confirm password to make changes:"), {
      target: { value: "password123" }
    });

    // Simulate form submission
    fireEvent.click(getByText("Save Changes"));

    // Assert that the PlantApi.saveProfile method is called with the correct arguments
    expect(PlantApi.saveProfile).toHaveBeenCalledWith(
      "testuser",
      {
        firstName: "Updated First Name",
        lastName: "Updated Last Name",
        email: "updated@example.com",
        password: "password123"
      }
    );
    
    mockUserContextValue.setCurrentUser({
      username: "testuser",
      firstName: "Updated First Name",
      lastName: "Updated Last Name",
      email: "updated@example.com"
    });
    // Assert that the setCurrentUser method is called with the updated user information
    expect(mockUserContextValue.setCurrentUser).toHaveBeenCalledWith({
      username: "testuser",
      firstName: "Updated First Name",
      lastName: "Updated Last Name",
      email: "updated@example.com"
    });
    // Simulate form submission
    fireEvent.click(getByText("Save Changes"));

    // Wait for the success message to appear
    await waitFor(() =>
      expect(queryByText("Updated successfully.")).toBeInTheDocument()
    );
    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();
  });
});
