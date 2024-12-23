import React, { createContext, useEffect, useState } from 'react';
import Authcontext from './Authcontext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.init';


export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
//onst auth = getAuth(app);

const AuthProvider = ({children}) => {


    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser= (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = () =>{
        return signInWithPopup(auth, googleProvider);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            
          //  console.log('current User', currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }
    , [])

    const authInfo = {

        user,
        setUser,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser
    }
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default AuthProvider;