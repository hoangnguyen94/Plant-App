import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PlantApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PlantApi.token}` };
    const params = (method === "get")
        ? data
        : {};
    if (PlantApi.token) {
      headers.Authorization = `Bearer ${PlantApi.token}`;
    }
    
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup ( data )
  {
    let res = await this.request( `auth/register`, data, "post" );
    return res.token;
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser ( username ) 
  {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Save user profile page. */

  static async saveProfile ( username, data ) 
  {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  // Individual API routes

  /** Get details on a plant handle. */


  static async getPlants ()
  {
    console.log( "im call" )
    let res = await this.request( `plants` );
    console.log(res)
    return res.plants;
  }

}

// for now, put token ("testadmin" / "password" on class)
PlantApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4Mzg2MTQ4OX0." +
    "PyO4D1hWxX6F5s6PGx-Ku2UBVaHezbGmUzUwP2-o91Q";

export default PlantApi;
