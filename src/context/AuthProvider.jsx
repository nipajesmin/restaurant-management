import React, { useState } from 'react';
import Authcontext from './Authcontext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase/firebase.init';


const AuthProvider = ({children}) => {


    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser= (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {

        user,
        loading,
        createUser
    }
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default AuthProvider;