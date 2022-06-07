import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../firebase.init';

const RequireAuth = ({children}) => {
    const [user, loading, error] = useAuthState(auth);

    if(loading){
        return <p>Loading...</p>;
    }

    if(!user){
        return <Navigate to='/'></Navigate>;
    }

    return children;
};

export default RequireAuth;