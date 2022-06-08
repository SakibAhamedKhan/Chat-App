import React from 'react';
import { useSignInWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';


const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const [updateProfile, updating, error2] = useUpdateProfile(auth);

    const navigate = useNavigate();

    if(loading || updating){
        return <div className='h-screen w-full flex justify-center items-center '>
        <p>Loading...</p>
    </div>;
    }
    if(user){
        navigate('/chatboard');
    }
    const handleUser1 = async() => {
       await signInWithEmailAndPassword('Sakibkhancrs1@gmail.com', '123456');
       updateProfile({displayName:'User1'}) 
        
    }

    const handleUser2 = async() => {
       await  signInWithEmailAndPassword('Sakibkhancrs2@gmail.com', '123456'); 
       updateProfile({displayName:'User2'}) 
    }
    
    return (
        <div className='flex justify-center items-center h-screen'>
            <div class="card w-fit bg-neutral text-neutral-content">
                <div class="card-body items-center text-center">
                    <h2 className='text-white text-2xl font-semibold mb-3'>Welcome to Chat App</h2>
                    <p className='text-white'>Here the two account can chat with each other</p>
                    <div class="card-actions justify-end my-5">
                        <button class="btn btn-primary mr-5" onClick={handleUser1}>User 1</button>
                        <button class="btn btn-secondary" onClick={handleUser2}>User 2</button>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default Login;