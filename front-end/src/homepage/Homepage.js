import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

const Homepage = () =>
{
    const { currentUser } = useContext( UserContext );
    console.debug( "Homepage", "currentUser=", currentUser );

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Plant</h1>
                <p className="lead">When you plant something, you invest in a beautiful future amidst a stressful, chaotic and, at times, downright appalling world.</p>
                {currentUser
                    ? <h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    : (
                        <p>
                            <Link className="btn btn-primary font-weight-bold mr-3"
                                to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-primary font-weight-bold"
                                to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    );
}

export default Homepage;
