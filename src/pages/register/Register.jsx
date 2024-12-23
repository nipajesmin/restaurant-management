import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Authcontext from '../../context/Authcontext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const { createUser } = useContext(Authcontext);
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

        // console.log(name, email, url, password);

        // Field validation
        if (!name) {
            toast.error('Name is required.', { position: 'top-center' });
            return;
        }
        if (!email) {
            toast.error('Email is required.', { position: 'top-center' });
            return;
        }
        if (!url) {
            toast.error('Photo URL is required.', { position: 'top-center' });
            return;
        }
        if (!password) {
            toast.error('Password is required.', { position: 'top-center' });
            return;
        }

        // Password validation
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.', { position: 'top-center' });
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one uppercase letter.', { position: 'top-center' });
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error('Password must contain at least one lowercase letter.', { position: 'top-center' });
            return;
        }


        createUser(email, password)
            .then(result => {
                //  console.log(result.user);
                const user = result.user;
                toast.success('Registration successful!', { position: 'top-center' });
                // updateUserProfile({ displayName: name, photoURL: url })
                //     .then(() => {
                //         setTimeout(() => {
                //             Navigate('/');
                //         }, 3000);
                //     })
                  //  .catch(error => {
                        //     toast.error(error.message, { position: 'top-center' });
                 //   });
            })
            .catch(error => {
                //   console.log('Error found', error.code);
                const errorCode = error.code
                //console.log('Error found', error.message);
                const errorMessage = error.message;
                toast.error(error.message, { position: 'top-center' });
            });


    }
    return (
        <div>

            <ToastContainer />
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
                                    type="password"
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