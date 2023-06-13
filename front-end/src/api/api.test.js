import axios from "axios";
import PlantApi from "./api";

jest.mock("axios");

describe("PlantApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("login sends a post request and returns the token", async () => {
    const data = {
      username: "testuser",
      password: "testpassword",
    };
	const token = PlantApi.token;
	

    axios.mockResolvedValueOnce({ data: { token } });

    const result = await PlantApi.login(data);

    expect(axios).toHaveBeenCalledWith({
      url: "http://localhost:3001/auth/token",
      method: "post",
      data,
      params: {},
      headers: {Authorization: `Bearer ${token}`},
    });
    expect(result).toBe(token);
  });

  test("signup sends a post request and returns the token", async () => {
    const data = {
      username: "testuser",
      password: "testpassword",
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
    };
	const token = PlantApi.token
	axios.mockResolvedValueOnce({ data: { token: token } });

	const result = await PlantApi.signup( data );  

    expect(axios).toHaveBeenCalledWith({
      url: "http://localhost:3001/auth/register",
      method: "post",
      data,
      params: {},
      headers: {Authorization: `Bearer ${token}`},
    });
    expect(result).toBe(token);
  });

  test("getCurrentUser sends a get request and returns the user", async () => {
    const username = "testadmin";
    const user = { username: "testadmin", firstName: "Test", lastName: "User" };

    axios.mockResolvedValueOnce({ data: { user } });

	const result = await PlantApi.getCurrentUser( username );
	
    expect(axios).toHaveBeenCalledWith({
      url: `http://localhost:3001/users/${username}`,
      method: "get",
      data: {},
      params: {},
      headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4Mzg2MTQ4OX0.PyO4D1hWxX6F5s6PGx-Ku2UBVaHezbGmUzUwP2-o91Q`},
    });
    expect(result).toBe(user);
  });

  // ... more tests for other methods of PlantApi

  // Snapshot test for the PlantApi class
  test("snapshot of the PlantApi class", () => {
    expect(PlantApi).toMatchSnapshot();
  });
});
