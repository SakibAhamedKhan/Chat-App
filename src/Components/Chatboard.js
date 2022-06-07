import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { BiBold, BiItalic } from "react-icons/bi";
import { AiOutlineStrikethrough } from "react-icons/ai";
import {BsLink, BsBlockquoteLeft} from "react-icons/bs"
import {HiCode} from "react-icons/hi"
import {BsPlusSquare} from "react-icons/bs"
import {GrEmoji} from "react-icons/gr"
import {MdAlternateEmail} from "react-icons/md"
import {MdOutlineFormatListBulleted, MdFormatListNumbered} from "react-icons/md"
import {GrCode} from 'react-icons/gr';

const Chatboard = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <div>
            <div class="navbar bg-white shadow-md px-5 fixed md:px-20 lg:px-20">
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
            <div class="bg-base-100 shadow-xl h-screen flex flex-col justify-between pt-20" >
                <div className=''>
                    <h2>Message</h2>
                </div>
                <div className='bg-white bg-stone-900 px-3 py-3'>
                    <div className='border border-2 border-slate-200 rounded-md'>
                        <div className='flex my-2 mx-3'>
                            <BiBold onClick={() => alert('You are bolded that')} className='text-white text-xl mx-2' />
                            <BiItalic className='text-white text-xl mx-2' />
                            <AiOutlineStrikethrough className='text-white text-xl mx-2' />
                            <BsLink className='text-white text-xl mx-2'/>
                            <MdOutlineFormatListBulleted className='text-white text-xl mx-2'/>
                            <MdFormatListNumbered className='text-white text-xl mx-2'/>
                            <BsBlockquoteLeft className='text-white text-xl mx-2'/>
                            <HiCode className='text-white text-xl mx-2'/>
                            
                        </div>
                        <div class="form-control">
                            <textarea class="textarea bg-stone-900 rounded-md h-18 text-white" placeholder="Chat comes here..." style={{ resize: "none" }}></textarea>
                        </div>
                        <div className='flex justify-between items-center px-2'>
                            <div className='flex'>
                                <BsPlusSquare className='text-white text-xl mx-2'/>
                                <GrEmoji className='text-white text-xl mx-2'/>
                                <MdAlternateEmail className='text-white text-xl mx-2'/>
                            </div>
                            <button className='btn btn-sm px-6 bg-green-600 text-white mt-1 mb-2 hover:bg-green-800'>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatboard;