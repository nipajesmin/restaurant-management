
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthProvider';
import Authcontext from '../../context/Authcontext';



const SignIn = () => {
    const { signInUser,setUser, signInWithGoogle } = useContext(Authcontext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);

                // Show success toast
                toast.success('Login successful!', { position: 'top-center' });

                // Navigate after showing toast
                setTimeout(() => {
                    navigate(location?.state ? location.state : '/');
                }, 2000); // Delay navigation by 2 seconds
            })
            .catch(error => {
                // Show error toast
                toast.error(error.message || 'Login failed!', { position: 'top-center' });
                // console.log('ERROR:', error.code, error.message);
                const errorMessage = error.message;
            });
    };
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                //  console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                //  console.log('ERROR', error.message)
                const errorMessage = error.message;
            })
    }

    
    return (
        <div>
            <ToastContainer />
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form 
                        onSubmit={handleSubmit} 
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
                                    onClick={handleGoogleSignIn}
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