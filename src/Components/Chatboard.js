import { signOut } from 'firebase/auth';
import React, { useReducer, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { BiBold, BiItalic } from "react-icons/bi";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { BsLink, BsBlockquoteLeft } from "react-icons/bs"
import { HiCode } from "react-icons/hi"
import { BsPlusSquare } from "react-icons/bs"
import { GrEmoji } from "react-icons/gr"
import { MdAlternateEmail } from "react-icons/md"
import { MdOutlineFormatListBulleted, MdFormatListNumbered } from "react-icons/md"
import { GrCode } from 'react-icons/gr';
import { ImCancelCircle } from 'react-icons/im';
import { initializeApp } from 'firebase/app';
import Picker from 'emoji-picker-react';
import { async } from '@firebase/util';

const initialChange = {
    bold: false,
    italic: false,
    strikethrought: false,
    bulletlist: false,
    highperLink: '',
    numberedlist: false,
    blockquote: false,
    codeSnippet: false,

}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'bold':
            console.log('hello')
            return {
                ...state,
                bold: action.do,
            }
        case 'italic':
            return {
                ...state,
                italic: !state.italic,
            }

        case 'strikethrought':
            return {
                ...state,
                strikethrought: !state.strikethrought,
            }
        case 'highperLink':
            return {
                ...state,
                highperLink: action.url,
            }
        case 'bulletlist':
            return {
                ...state,
                bulletlist: !state.bulletlist,
                numberedlist: false,
            }
        case 'numberedlist':
            return {
                ...state,
                numberedlist: !state.numberedlist,
                bulletlist: false,
            }

        case 'blockquote':
            return {
                ...state,
                blockquote: !state.blockquote,
            }
        case 'codeSnippet':
            return {
                ...state,
                codeSnippet: !state.codeSnippet,
            }

        default:
            return state;
    }
}

const Chatboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [textAreavalue, setTextAreaValue] = useState("");
    const [classChange, dispatch] = useReducer(reducer, initialChange);
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = async (event, emojiObject) => {
        const emojiCode = emojiObject.emoji
        const textV = `${textAreavalue}${emojiCode}`;
        setTextAreaValue(textV);
        console.log(emojiCode);
    };

    console.log(classChange);
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
                <div className='bg-white bg-white px-3 py-3'>
                    <div className='border border-2 border-slate-200 rounded-md'>
                        <div className='flex my-2 mx-3'>
                            <BiBold onClick={() => {
                                dispatch({ type: 'bold', do: !classChange.bold });
                            }} className={`text-black text-xl mx-2
                                ${(classChange.bold) ? 'bg-slate-300 rounded-sm' : ''}                            
                            `} />
                            <BiItalic onClick={() => {
                                dispatch({ type: 'italic', do: !classChange.italic });
                            }} className={`text-black text-xl mx-2
                            ${(classChange.italic) ? 'bg-slate-300 rounded-sm' : ''}                            
                        `} />
                            <AiOutlineStrikethrough onClick={() => {
                                dispatch({ type: 'strikethrought', do: !classChange.strikethrought });
                            }} className={`text-black text-xl mx-2
                            ${(classChange.strikethrought) ? 'bg-slate-300 rounded-sm' : ''}                            
                        `} />
                            <BsLink onClick={() => {
                                if (classChange.highperLink !== '') {
                                    const conforms = window.confirm('Are you sure to remove highperlink ?');
                                    if (conforms) {
                                        dispatch({ type: 'highperLink', url: '' });
                                    }
                                } else {
                                    const conform = prompt('Enter the highper Link: ');
                                    if (conform) {
                                        dispatch({ type: 'highperLink', url: conform });
                                    } else {
                                        alert('opps');
                                    }
                                }
                            }} className={`text-black text-xl mx-2
                         ${(classChange.highperLink) ? 'bg-slate-300 rounded-sm' : ''}                            
                     `} />
                            <MdOutlineFormatListBulleted className='text-black text-xl mx-2' />
                            <MdFormatListNumbered className='text-black text-xl mx-2' />
                            <BsBlockquoteLeft className='text-black text-xl mx-2' />
                            <HiCode className='text-black text-xl mx-2' />

                        </div>
                        <div class="form-control">
                            <textarea onKeyPress={(event) => {
                                console.log(event);
                            }} value={textAreavalue}
                                onChange={(event) => {
                                    setTextAreaValue(event.target.value);
                                    console.log(event);
                                }}
                                class={`textarea bg-white  rounded-md h-18 text-black focus:outline-0
                            ${(classChange.bold) ? 'font-bold' : ''}
                            ${(classChange.italic) ? 'italic' : ''}
                            ${(classChange.strikethrought) ? 'line-through' : ''}
                            ${(classChange.highperLink !== '') ? 'text-blue-500 underline' : ''}

                            `} placeholder="Chat comes here..." style={{ resize: "none" }}></textarea>
                        </div>
                        <div className='flex justify-between items-center px-2'>
                            <div className='flex'>
                                <label for='file-upload'>
                                    <BsPlusSquare className='text-black text-xl mx-2 cursor-pointer	' />
                                </label>
                                <input id='file-upload' type="file" style={{ display: 'none' }} />
                                {
                                    showEmoji ?
                                        <ImCancelCircle onClick={() => {
                                            setShowEmoji(!showEmoji)
                                        }} className='text-black text-xl mx-2' />
                                        :
                                        <GrEmoji onClick={() =>
                                            setShowEmoji(!showEmoji)
                                        } className='text-black text-xl mx-2' />
                                }
                                <MdAlternateEmail className='text-black text-xl mx-2' />
                            </div>
                            <button className='btn btn-sm px-6 bg-green-600 text-white mt-1 mb-2 hover:bg-green-800'>Send</button>
                            {
                                showEmoji ?
                                    <div className='absolute  top-40'>
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatboard;