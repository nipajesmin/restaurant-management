import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    
    return (
        <div>
            {/* <ToastContainer /> */}
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form 
                      //  onSubmit={handleSubmit} 
                        className="card-body">
                            <h1 className="text-2xl font-bold text-center">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                                
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className={`btn btn-primary `}
                                   // disabled={loading}
                                >
                                    {/* {loading ? 'Logging in...' : 'Login'} */}
                                    Sign In
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                 //   onClick={handleGoogleSignIn}
                                    type="button"
                                    className={`btn btn-primary `}
                                  //  disabled={loading}
                                >
                                    Sign in with Google
                                </button>
                            </div>
                            <p className="text-sm text-center mt-2">
                                Don’t have an account?{' '}
                                <Link to="/register" className="link link-primary">
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
           
        </div>
    );

    
};

export default SignIn;