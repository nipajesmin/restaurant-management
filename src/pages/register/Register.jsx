import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const handleRegister = (e) => {
        // const form = new FormData(e.target);
        // const name = form.get("name");
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const url = form.url.value;
        const password = form.password.value;
        //const email = form.get("email");
        // const url = form.get("url");
        //const password = form.get("password");

        console.log(name, email, url, password);
 

    }
    return (
        <div>

            <h1 className="text-3xl md:text-5xl font-bold pb-5 pt-4 bg-base-200 text-center">
                Register Now!
            </h1>

            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form
                        onSubmit={handleRegister}
                        className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="name"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="url"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input

                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered w-full"
                                    required
                                />

                            </div>

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                //        onClick={handleGoogleSignIn}
                                type="button"
                                className="btn btn-primary"
                            >
                                Login with Google
                            </button>
                        </div>
                    </form>
                    <p className="ml-4 mb-4 pl-12">
                        Already have an account? Please <Link to="/signin" className="text-blue-600">SignIn</Link>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Register;