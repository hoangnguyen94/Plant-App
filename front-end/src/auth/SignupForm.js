import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /plants route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

const SignupForm = ( { signup } ) =>
{
    const history = useHistory();
    const [ formData, setFormData ] = useState( {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    } );
    const [ formErrors, setFormErrors ] = useState( [] );

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    /** Handle form submit:
    *
    * Calls login func prop and, if successful, redirect to /homepage.
    */

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup( formData );
        if (result.success) {
            history.push( "/homepage" );
        } else {
            setFormErrors( result.errors );
        };
        };

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData( data => ( { ...data, [ name ]: value } ) );
    };

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Sign Up</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }

                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                                onSubmit={handleSubmit}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
