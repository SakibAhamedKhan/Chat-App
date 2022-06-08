import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../firebase.init';

const RequireAuth = ({children}) => {
    const [user, loading, error] = useAuthState(auth);

    if(loading){
        return <div className='h-screen w-full flex justify-center items-center '>
        <p>Loading...</p>
    </div>;
    }

    if(!user){
        return <Navigate to='/'></Navigate>;
    }

    return children;
};

export default RequireAuth;