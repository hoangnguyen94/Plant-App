import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useHistory, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoginForm from './LoginForm';
import { act } from 'react-dom';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'), // Keep all the actual named exports
	useHistory: jest.fn(),
  }));

describe('LoginForm component', () => {
  beforeEach(() => {
    useHistory.mockReturnValue({
      push: jest.fn(),
    });
  });

	test( 'renders the login form component', () =>
	{
		const { container } = render( <LoginForm login={() => { }} /> );
    
		expect( container.firstChild ).toMatchSnapshot();
	} );

	test( 'handles form submission successfully', async () =>
	{
		const history = createMemoryHistory();
		const loginMock = jest.fn( () => Promise.resolve( { success: true } ) );
		const { getByLabelText, getByText } = render( <LoginForm login={loginMock} />, { history } );
  
		const usernameInput = getByLabelText( 'Username' );
		const passwordInput = getByLabelText( 'Password' );
		const submitButton = getByText( 'Submit' );
  
		fireEvent.change( usernameInput, { target: { value: 'testuser' } } );
		fireEvent.change( passwordInput, { target: { value: 'testpassword' } } );
		fireEvent.click( submitButton );
  
		expect( loginMock ).toHaveBeenCalledWith( {
			username: 'testuser',
			password: 'testpassword',
		} );
		expect( history.location.pathname ).toBe( '/' );
	} );
  
	test( 'handles form submission with errors', async () =>
	{
		const history = createMemoryHistory();
		const loginMock = jest.fn( () =>
			Promise.resolve( { success: false, errors: [ 'Invalid username', 'Invalid password' ] } )
		);
	
		const { getByLabelText, getByText, getByRole } = render(
			<BrowserRouter>
				<LoginForm login={loginMock} />
			</BrowserRouter>
		);
	
		const usernameInput = getByLabelText( 'Username' );
		const passwordInput = getByLabelText( 'Password' );
		const submitButton = getByText( 'Submit' );
	
		fireEvent.change( usernameInput, { target: { value: 'testuser' } } );
		fireEvent.change( passwordInput, { target: { value: 'testpassword' } } );
		fireEvent.click( submitButton );
	
		expect( loginMock ).toHaveBeenCalledWith( {
			username: 'testuser',
			password: 'testpassword',
		} );
		expect( history.location.pathname ).toBe( '/' );
	} );
});

