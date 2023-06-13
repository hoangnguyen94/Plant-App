const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens');
const jsonschema = require( 'jsonschema' );

jest.mock('../models/user');

// Mock the User.authenticate method
User.authenticate.mockResolvedValue({
  username: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  email: 'henry@henryng.com',
  isAdmin: false,
});

// Mock the createToken function
jest.mock('../helpers/tokens');
createToken.mockReturnValue('testtoken');

// Mock the jsonschema validate function
jest.mock('jsonschema');
jsonschema.validate.mockReturnValue({ valid: true });


describe('Authentication Routes', () => {
  describe('POST /auth/token', () => {
    it('should return a token when valid username and password are provided', async () => {
      const userData = {
        username: 'testuser',
        password: 'testpassword'
      };

      const response = await request(app)
        .post('/auth/token')
        .send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ token: 'testtoken' });
      expect(User.authenticate).toHaveBeenCalledWith(userData.username, userData.password);
      expect(createToken).toHaveBeenCalledWith({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'henry@henryng.com',
        isAdmin: false,
      });
    });

    it('should return a BadRequestError when invalid data is provided', async () => {
      const validationErrors = [
        {
          stack: 'Invalid username'
        },
      ];
      jsonschema.validate.mockReturnValue({ valid: false, errors: validationErrors });

      const response = await request(app)
        .post('/auth/token')
        .send({
          username: '',
          password: 'testpassword',
        } );
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: {
          message: validationErrors.map((error) => error.stack),
          status: 400,
        }
      });
    });
  });

	
	
	
// Mock the User.register method
	User.register.mockResolvedValue({
	username: 'testuser',
	password: 'password',
	firstName: 'Test',
	lastName: 'User',
	email: 'henry@henryng.com',
	isAdmin: false,
	} );
	
describe('POST /auth/register', () => {
	it( 'should create a new user and return a token', async () =>
	{
		jsonschema.validate.mockReturnValue( { valid: true } )
		const userData = {
			username: 'testuser',
			password: 'password',
			firstName: 'Test',
			lastName: 'User',
			email: 'henry@henryng.com',
		};
		const response = await request( app )
			.post( '/auth/register' )
			.send( userData )
		
		expect( response.statusCode ).toBe( 201 );
		expect(response.body.token).toEqual('testtoken');
      	expect(User.register).toHaveBeenCalledWith({ ...userData, isAdmin: false });
      	expect(createToken).toHaveBeenCalledWith({
        	username: 'testuser',
        	firstName: 'Test',
        	lastName: 'User',
        	email: 'henry@henryng.com',
        	isAdmin: false,
      });

	} );

    it('should return a BadRequestError when invalid data is provided', async () => {
		const validationErrors = [
			{
				stack: 'Invalid email',
			  }
		]
		jsonschema.validate.mockReturnValue( { valid: false, errors: validationErrors } );

		const response = await request( app )
			.post( '/auth/register' )
			.send( {
				username: 'test1user',
				password: 'testpassword',
				firstName: 'Test',
				lastName: 'User',
				email: 'invalid_email'
			} );
		console.log("request",response)
    	expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        error: {
          message: validationErrors.map((error) => error.stack),
          status: 400,
        },
      });
    });
} );
});


