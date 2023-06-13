import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SignupForm from './SignupForm';

describe('SignupForm component', () => {
  test('renders the signup form component', () => {
    const { container } = render(<SignupForm signup={() => {}} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('handles form submission successfully', async () => {
    const history = createMemoryHistory();
    const signupMock = jest.fn(() => Promise.resolve({ success: true }));
    const { getByLabelText, getByText } = render(
      <Router history={history}>
        <SignupForm signup={signupMock} />
      </Router>
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const firstNameInput = getByLabelText('First name');
    const lastNameInput = getByLabelText('Last name');
    const emailInput = getByLabelText('Email');
    const submitButton = getByText('Submit');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'Tester' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(signupMock).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpassword',
      firstName: 'Test',
      lastName: 'Tester',
      email: 'test@example.com',
	} );
	
    expect(history.location.pathname).toBe('/');
  });

  test('handles form submission with errors', async () => {
    const history = createMemoryHistory();
    const signupMock = jest.fn(() =>
      Promise.resolve({ success: false, errors: ['Invalid username', 'Invalid password'] })
    );

    const { getByLabelText, getByText, getByRole } = render(
      <Router history={history}>
        <SignupForm signup={signupMock} />
      </Router>
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const firstNameInput = getByLabelText('First name');
    const lastNameInput = getByLabelText('Last name');
    const emailInput = getByLabelText('Email');
    const submitButton = getByText('Submit');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'Tester' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(signupMock).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpassword',
      firstName: 'Test',
      lastName: 'Tester',
      email: 'test@example.com',
    });
    expect(history.location.pathname).toBe('/');
  });
});
