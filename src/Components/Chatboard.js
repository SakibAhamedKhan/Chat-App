import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Chatboard = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <div>
            <div class="navbar bg-base-100 px-5  md:px-20 lg:px-20">
                <div class="navbar-start">
                    <a class="btn btn-ghost normal-case text-xl">Chat App</a>
                </div>
                <div className='navbar-center'>
                    <p className='font-semibold text-xl'>{user?.displayName}</p>
                </div>
                <div class="navbar-end">
                    <div onClick={() => {
                        signOut(auth);
                    }} class="btn text-white">Log out</div>
                </div>
            </div>
            <div class="card lg:card-side bg-base-100 shadow-xl">

            </div>
        </div>
    );
};

export default Chatboard;