import React, { useContext } from 'react';
import Authcontext from '../context/Authcontext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user ,loading} = useContext(Authcontext);
    const location = useLocation();

    if (loading) {
        return <div className='flex min-h-screen justify-center items-center'>
            <span className="loading loading-infinity loading-lg"></span>
        </div>


    }
    if (user && user?.email) {
        return children;
    }
    return (
        <div>
            <Navigate state={location.pathname} to="/signin"></Navigate>
        </div>
    );
};

export default PrivateRoute;