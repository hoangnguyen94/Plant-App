const request = require('supertest');
const app = require( '../app' );
const { createToken } = require( '../helpers/tokens' );
const User = require( '../models/user' );
const db = require("../db.js");
const {commonBeforeEach, commonAfterEach, commonAfterAll } = require( "./testcase" );
db.connect();

async function commonBeforeAll ()
{
	// noinspection SqlWithoutWhere
	await db.query( "DELETE FROM users" );
  
	await User.register( {
		username: "u1",
		password: "password1",
		firstName: "U1F",
		lastName: "U1L",
		email: "user1@user.com",
		isAdmin: false,
	} );
	await User.register( {
		username: "u2",
		password: "password2",
		firstName: "U2F",
		lastName: "U2L",
		email: "user2@user.com",
		isAdmin: false,
	} );
	await User.register( {
		username: "u3",
		password: "password3",
		firstName: "U3F",
		lastName: "U3L",
		email: "user3@user.com",
		isAdmin: false,
	} );
};

  
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
  
const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


describe("POST /users", function () {
	test("works for admins: create non-admin", async function () {
	  const resp = await request(app)
		  .post("/users")
		  .send({
			username: "u-new",
			firstName: "First-new",
			lastName: "Last-newL",
			password: "password-new",
			email: "new@email.com",
			isAdmin: false,
		  })
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(201);
	  expect(resp.body).toEqual({
		user: {
		  username: "u-new",
		  firstName: "First-new",
		  lastName: "Last-newL",
		  email: "new@email.com",
		  isAdmin: false,
		}, token: expect.any(String),
	  });
	});
  
	test("works for admins: create admin", async function () {
	  const resp = await request(app)
		  .post("/users")
		  .send({
			username: "u-new",
			firstName: "First-new",
			lastName: "Last-newL",
			password: "password-new",
			email: "new@email.com",
			isAdmin: true,
		  })
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(201);
		expect( resp.body ).toEqual( {
			user: {
				username: "u-new",
				firstName: "First-new",
				lastName: "Last-newL",
				email: "new@email.com",
				isAdmin: true,
			}, token: expect.any( String ),
		} );
	});
  
	test("unauth for users", async function () {
	  const resp = await request(app)
		  .post("/users")
		  .send({
			username: "u-new",
			firstName: "First-new",
			lastName: "Last-newL",
			password: "password-new",
			email: "new@email.com",
			isAdmin: true,
		  })
		  .set("authorization", `Bearer ${u1Token}`);
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("unauth for anon", async function () {
	  const resp = await request(app)
		  .post("/users")
		  .send({
			username: "u-new",
			firstName: "First-new",
			lastName: "Last-newL",
			password: "password-new",
			email: "new@email.com",
			isAdmin: true,
		  });
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("bad request if missing data", async function () {
	  const resp = await request(app)
		  .post("/users")
		  .send({
			username: "u-new",
		  })
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(400);
	});
  
	test("bad request if invalid data", async function () {
	  const resp = await request(app)
		  .post("/users")
		  .send({
			username: "u-new",
			firstName: "First-new",
			lastName: "Last-newL",
			password: "password-new",
			email: "not-an-email",
			isAdmin: true,
		  })
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(400);
	});
  });
  
  /************************************** GET /users */
  
  describe("GET /users", function () {
	test("works for admins", async function () {
	  const resp = await request(app)
		  .get("/users")
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.body).toEqual({
		users: [
		  {
			username: "u1",
			firstName: "U1F",
			lastName: "U1L",
			email: "user1@user.com",
			isAdmin: false,
		  },
		  {
			username: "u2",
			firstName: "U2F",
			lastName: "U2L",
			email: "user2@user.com",
			isAdmin: false,
		  },
		  {
			username: "u3",
			firstName: "U3F",
			lastName: "U3L",
			email: "user3@user.com",
			isAdmin: false,
		  },
		],
	  });
	});
  
	test("unauth for non-admin users", async function () {
	  const resp = await request(app)
		  .get("/users")
		  .set("authorization", `Bearer ${u1Token}`);
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("unauth for anon", async function () {
	  const resp = await request(app)
		  .get("/users");
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("fails: test next() handler", async function () {
	  // there's no normal failure event which will cause this route to fail ---
	  // thus making it hard to test that the error-handler works with it. This
	  // should cause an error, all right :)
	  await db.query("DROP TABLE users CASCADE");
	  const resp = await request(app)
		  .get("/users")
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(500);
	});
  });
  
  /************************************** GET /users/:username */
  
  describe("GET /users/:username", function () {
	test("works for admin", async function () {
	  const resp = await request(app)
		  .get(`/users/u1`)
		  .set("authorization", `Bearer ${adminToken}`);
		expect( resp.body ).toEqual( {
			user: {
				username: "u1",
				firstName: "U1F",
				id: expect.any( Number ),
				lastName: "U1L",
				email: "user1@user.com",
				isAdmin: false
			},
		} );
	});
  
	test("works for same user", async function () {
	  const resp = await request(app)
		  .get(`/users/u1`)
		  .set("authorization", `Bearer ${u1Token}`);
	  expect(resp.body).toEqual({
		user: {
		  username: "u1",
		  firstName: "U1F",
			  lastName: "U1L",
			  id: expect.any( Number ),
		  email: "user1@user.com",
		  isAdmin: false
		}
	  });
	});
  
	test("unauth for other users", async function () {
	  const resp = await request(app)
		  .get(`/users/u1`)
		  .set("authorization", `Bearer ${u2Token}`);
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("unauth for anon", async function () {
	  const resp = await request(app)
		  .get(`/users/u1`);
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("not found if user not found", async function () {
	  const resp = await request(app)
		  .get(`/users/nope`)
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(404);
	});
  });
  
  /************************************** PATCH /users/:username */
  
  describe("PATCH /users/:username", () => {
	test("works for admins", async function () {
	  const resp = await request(app)
		  .patch(`/users/u1`)
		  .send({
			firstName: "New",
		  })
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.body).toEqual({
		user: {
		  username: "u1",
		  firstName: "New",
		  lastName: "U1L",
		  email: "user1@user.com",
		  isAdmin: false,
		},
	  });
	});
  
	test("works for same user", async function () {
	  const resp = await request(app)
		  .patch(`/users/u1`)
		  .send({
			firstName: "New",
		  })
		  .set("authorization", `Bearer ${u1Token}`);
	  expect(resp.body).toEqual({
		user: {
		  username: "u1",
		  firstName: "New",
		  lastName: "U1L",
		  email: "user1@user.com",
		  isAdmin: false,
		},
	  });
	});
  
	test("unauth if not same user", async function () {
	  const resp = await request(app)
		  .patch(`/users/u1`)
		  .send({
			firstName: "New",
		  })
		  .set("authorization", `Bearer ${u2Token}`);
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("unauth for anon", async function () {
	  const resp = await request(app)
		  .patch(`/users/u1`)
		  .send({
			firstName: "New",
		  });
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("not found if no such user", async function () {
	  const resp = await request(app)
		  .patch(`/users/nope`)
		  .send({
			firstName: "Nope",
		  })
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(404);
	});
  
	test("bad request if invalid data", async function () {
	  const resp = await request(app)
		  .patch(`/users/u1`)
		  .send({
			firstName: 42,
		  })
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(400);
	});
  
	test("works: can set new password", async function () {
	  const resp = await request(app)
		  .patch(`/users/u1`)
		  .send({
			password: "new-password",
		  })
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.body).toEqual({
		user: {
		  username: "u1",
		  firstName: "U1F",
		  lastName: "U1L",
		  email: "user1@user.com",
		  isAdmin: false,
		},
	  });
	  const isSuccessful = await User.authenticate("u1", "new-password");
	  expect(isSuccessful).toBeTruthy();
	});
  });
  
  /************************************** DELETE /users/:username */
  
  describe("DELETE /users/:username", function () {
	test("works for admin", async function () {
	  const resp = await request(app)
		  .delete(`/users/u1`)
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.body).toEqual({ deleted: "u1" });
	});
  
	test("works for same user", async function () {
	  const resp = await request(app)
		  .delete(`/users/u1`)
		  .set("authorization", `Bearer ${u1Token}`);
	  expect(resp.body).toEqual({ deleted: "u1" });
	});
  
	test("unauth if not same user", async function () {
	  const resp = await request(app)
		  .delete(`/users/u1`)
		  .set("authorization", `Bearer ${u2Token}`);
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("unauth for anon", async function () {
	  const resp = await request(app)
		  .delete(`/users/u1`);
	  expect(resp.statusCode).toEqual(401);
	});
  
	test("not found if user missing", async function () {
	  const resp = await request(app)
		  .delete(`/users/nope`)
		  .set("authorization", `Bearer ${adminToken}`);
	  expect(resp.statusCode).toEqual(404);
	});
  });