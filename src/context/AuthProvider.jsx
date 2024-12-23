import React, { useState } from 'react';
import Authcontext from './Authcontext';

const AuthProvider = ({children}) => {


    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authInfo ={

        user,
        loading
    }
    return (
        <Authcontext.provider value={authInfo}>
            {children}
        </Authcontext.provider>
    );
};

export default AuthProvider;