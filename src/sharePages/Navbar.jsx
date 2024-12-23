import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Authcontext from '../context/Authcontext';



const Navbar = () => {

    const { user, signOutUser } = useContext(Authcontext);
    const location = useLocation();

    // Function to check if the current route is active
    const isActive = (path) => location.pathname === path;
    return (
        <nav className="bg-slate-300 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between items-center">
                {/* Logo Section */}
                <div className="mb-4 md:mb-0">
                    <Link
                        to="/"
                        className="text-lg font-bold bg-lime-50 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition"
                    >
                        FeastFusion
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 items-center text-slate-950">
                    <Link
                        to="/"
                        className={`hover:text-yellow-300 transition ${isActive('/') ? 'font-bold text-yellow-500' : ''}`}
                    >
                        Home
                    </Link>


                    <Link
                        to="/allFoods"
                        className={`hover:text-yellow-300 transition ${isActive('/allSportsEquipment') ? 'font-bold text-yellow-500' : ''}`}
                    >
                        All Foods
                    </Link>
                    <Link
                        to="/gallary"
                        className={`hover:text-yellow-300 transition ${isActive('/allSportsEquipment') ? 'font-bold text-yellow-500' : ''}`}
                    >
                        Gallary
                    </Link>
                    
                    {/* {user && (
                        <>
                            <Link
                                to="/myEquipments"
                                className={`hover:text-yellow-300 transition ${isActive('/myProfile') ? 'font-bold text-yellow-500' : ''}`}
                            >
                                My Equipment List
                            </Link>
                            <Link
                                to="/addEquipments"
                                className={`hover:text-yellow-300 transition ${isActive('/addEquipments') ? 'font-bold text-yellow-500' : ''}`}
                            >
                                Add Equipment
                            </Link>
                        </>
                    )} */}
                </div>

                {/* User Section */}
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    {user && user.email ? (
                        <div className="flex items-center space-x-2">
                            <img
                                 src={user?.photoURL}
                                alt="User"
                                className="h-6 w-6 rounded-full object-cover"
                                 title={user?.displayName || 'User'} // Tooltip with user's name
                            />
                            <button
                                 onClick={signOutUser}
                                className="text-black bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                                Sign Out
                            </button>
                        </div>
                     ) : ( 
                        <div className="flex space-x-4">
                            <Link
                                to="/signin"
                                className={`text-black hover:text-blue-600 transition ${isActive('/login') ? 'font-bold text-yellow-500' : ''}`}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className={`text-black hover:text-blue-600 transition ${isActive('/register') ? 'font-bold text-yellow-500' : ''}`}
                            >
                                Register
                            </Link>
                        </div>
                     )} 
                </div>
                

                
            </div>
        </nav>
    );

};

export default Navbar;