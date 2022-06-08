import { signOut } from 'firebase/auth';
import React, { useEffect, useReducer, useState } from 'react';
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
                italic: action.do,
            }

        case 'strikethrought':
            return {
                ...state,
                strikethrought: action.do,
            }
        case 'highperLink':
            return {
                ...state,
                highperLink: action.url,
            }
        case 'bulletlist':
            return {
                ...state,
                numberedlist: false,
                bulletlist: action.do,
            }
        case 'numberedlist':
            console.log('in ',action);
            return {
                ...state,
                bulletlist: false,
                numberedlist: action.do,
            }

        case 'blockquote':
            return {
                ...state,
                blockquote: action.do,
            }
        case 'codeSnippet':
            return {
                ...state,
                codeSnippet: action.do,
            }

        default:
            return state;
    }
}

const Chatboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [textAreavalue, setTextAreaValue] = useState("");
    const [textAreavalue2, setTextAreaValue2] = useState("");
    const [classChange, dispatch] = useReducer(reducer, initialChange);
    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState([]);
    const [refresh, setRefresh] = useState('');
    const [loading2, setLoading2] = useState(true);
    const [recentKey, setRecentKey] = useState('');

    const onEmojiClick = async (event, emojiObject) => {
        const emojiCode = emojiObject.emoji
        const textV = `${textAreavalue}${emojiCode}`;
        setTextAreaValue(textV);
        console.log(emojiCode);
    };

    const scrollBottom = () => {
        let element = document.getElementById('message-container');
        element.scrollTop = element.scrollHeight;
    }
    useEffect(() => {
        fetch('https://sheltered-woodland-29145.herokuapp.com/message')
            .then(res => res.json())
            .then(async (data) => {
                await setMessage(data);
                await setLoading2(false);
                setTimeout(scrollBottom, 1000);
            });

    }, [refresh]);

    useEffect(()=> {
        const handlenumberedList  = async() => {
            console.log(classChange);
            if(classChange.numberedlist){
                    const textV = textAreavalue.split('\n');
                    let textV2 ='';
                    console.log(textV);
                    textV.map((t, index) => {
                        if((textV.length - 1) === index && t!==''){
                            textV2 = textV2 + (`${index+1}. ${t}`);
                        } else if(t!==''){
                            textV2 = textV2 + (`${index+1}. ${t}\n`);
                        }
                    })
                    console.log(textV2);
                    setTextAreaValue(textV2);
                } else if(!classChange.bulletlist && !classChange.numberedlist) {
                    const textV = textAreavalue.split('\n');
                    let textV2 ='';
                    textV.map((t, index) => {
                        if((textV.length - 1) === index && t!==''){
                            textV2 = textV2 + `${t.slice(3)}`;
                        } else if(t!==''){
                            textV2 = textV2 + `${t.slice(3)}\n`;
                        }
                    })
                    setTextAreaValue(textV2);
                }
        }
        handlenumberedList();
    },[classChange.numberedlist]);

    useEffect(()=> {
        const handleBulletList = async() => {
            console.log(classChange);
            if(classChange.bulletlist){
             console.log('11111');
                 const textV = textAreavalue.split('\n');
                 let textV2 ='';
                 textV.map((t, index) => {
                     if((textV.length - 1) === index && t!==''){
                         textV2 = textV2 + (`* ${t}`);
                     } else if(t!==''){
                         textV2 = textV2 + (`* ${t}\n`);
                     }
                 })
                 setTextAreaValue(textV2);
             } else if(!classChange.numberedlist && !classChange.bulletlist) {
     
                 const textV = textAreavalue.split('\n');
                 let textV2 ='';
                 textV.map((t, index) => {
                     if((textV.length - 1) === index && t!==''){
                         textV2 = textV2 + `${t.slice(2)}`;
                     } else if(t!==''){
                         textV2 = textV2 + `${t.slice(2)}\n`;
                     }
                 })
                 setTextAreaValue(textV2);
             }
         }
         handleBulletList();
    }, [classChange.bulletlist]);

    

    if (loading2) {
        return <div className='h-screen w-full flex justify-center items-center '>
            <p>Loading...</p>
        </div>
    }

    const handleSend = (event) => {
        event.preventDefault();
        console.log(textAreavalue.length);
        const doc = {
            email: user.email,
            userName: user.displayName,
            message: textAreavalue,
            style: {
                bold: classChange.bold,
                italic: classChange.italic,
                strikethrought: classChange.strikethrought,
                bulletlist: classChange.bulletlist,
                highperLink: classChange.highperLink,
                numberedlist: classChange.numberedlist,
                blockquote: classChange.blockquote,
                codeSnippet: classChange.codeSnippet,
            }
        }
        fetch('https://sheltered-woodland-29145.herokuapp.com/message', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(doc)
        })
            .then(res => res.json())
            .then(data => {
                setRefresh(new Date().getTime());
                setTimeout(scrollBottom,1000);
                console.log(data);
            })


        dispatch({ type: 'bold', do: false });
        dispatch({ type: 'italic', do: false });
        dispatch({ type: 'strikethrought', do: false });
        dispatch({ type: 'highperLink', url: '' });
        dispatch({ type: 'bulletlist', do:false });
        

        setTextAreaValue('');
    }

    // document.getElementsByClassName('message-container').window.scrollIntoView(false)

    
    
    
    console.log(textAreavalue);
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
                    }} class="btn btn-sm text-white">Log out</div>
                </div>
            </div>
            <div class="bg-base-100 shadow-xl h-screen flex flex-col justify-between pt-20 max-w-6xl mx-auto"  >
                <div className='overflow-y-scroll ' id='message-container'>
                    {
                        message.map(m => <div
                            key={m._id}
                            className={`w-full flex ${(m.email === user.email) ? 'justify-end px-4' : 'justify-start px-4'}`}
                        >
                            {
                                (m.style.highperLink !== '')?
                                <a className={`break-all max-w-fit text-end p-2 rounded-lg ${(m.email === user.email) ? 'bg-green-500 my-2 text-blue-600 ' : 'bg-white border my-2 text-blue-600 underline'}
                                ${m.style.bold ? 'font-bold' : ''}
                                ${m.style.italic ? 'italic' : ''}
                                underline
                               
                                
                                `}
                                href= {`${m.style.highperLink}`}
                                target="_blank"
                                >
                                    {m.message}
                                </a>
                                :
                                <div className={`whitespace-pre-line break-all max-w-fit text-end p-2 rounded-lg ${(m.email === user.email) ? 'bg-green-500 my-2 text-white' : 'bg-white border my-2'}
                                ${m.style.bold ? 'font-bold' : ''}
                                ${m.style.italic ? 'italic' : ''}
                                ${m.style.strikethrought ? 'line-through' : ''}
                                ${m.style.highperLink !== '' ? 'text-blue-500 underline' : ''}
                                
                                
                                `}>
                                    {m.message}
                                </div>
                            }
                        </div>)
                    }
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
                                    const conform = window.confirm('Are you sure to remove highperlink ?');
                                    if (conform) {
                                        dispatch({ type: 'highperLink', url: '' });
                                    }
                                } else {
                                    const conform = prompt('Enter the highper Link: ');
                                    if (conform) {
                                        dispatch({ type: 'highperLink', url: conform });
                                    }
                                }
                            }} className={`text-black text-xl mx-2
                         ${(classChange.highperLink) ? 'bg-slate-300 rounded-sm' : ''}                            
                     `} />
                            <MdOutlineFormatListBulleted onClick={async() => {
                                // dispatch({type: 'numberedlist', do: false});
                                // setTimeout(1000);
                                if(classChange.numberedlist){
                                    alert('Disable Number List First');
                                } else{
                                    dispatch({type: 'bulletlist',do: !classChange.bulletlist});
                                }
                            }} className={`text-black text-xl mx-2
                            ${(classChange.bulletlist) ? 'bg-slate-300 rounded-sm' : ''}`}
                            
                            />
                            <MdFormatListNumbered onClick={() => {
                                // dispatch({type: 'bulletlist',do: false});
                                // setTimeout(1000);
                                if(classChange.bulletlist){
                                    alert('Disable Bullet List First');
                                } else{
                                    dispatch({type: 'numberedlist', do: !classChange.numberedlist});
                                }

                            }} className={`text-black text-xl mx-2
                            ${(classChange.numberedlist && !classChange.codeSnippet) ? 'bg-slate-300 rounded-sm' : ''}`} />
                            <BsBlockquoteLeft onClick={() => {
                                dispatch({type: 'blockquote', do: !classChange.blockquote});

                            }} className={`text-black text-xl mx-2
                            ${(classChange.blockquote) ? 'bg-slate-300 rounded-sm' : ''}`} />
                            <HiCode onClick={()=>{
                                dispatch({type: 'numberedlist', do: !classChange.numberedlist});
                                dispatch({type: 'codeSnippet', do: !classChange.codeSnippet})
                            }} className={`text-black text-xl mx-2
                            ${(classChange.codeSnippet) ? 'bg-slate-300 rounded-sm' : ''}`} />

                        </div>
                        <form onSubmit={handleSend}>
                            <div class="form-control">
                                <textarea onKeyPress={(event) => {
                                    console.log(event);
                                    setRecentKey(event.key);
                                }} value={textAreavalue}
                                    onChange={(event) => {
                                       
                                        setTextAreaValue(event.target.value);
                                        console.log();
                                    }}
                                    class={`textarea bg-white  rounded-md h-18 text-black focus:outline-0
                                ${(classChange.bold) ? 'font-bold' : ''}
                                ${(classChange.italic) ? 'italic' : ''}
                                ${(classChange.strikethrought) ? 'line-through' : ''}
                                ${(classChange.highperLink !== '') ? 'text-blue-500 underline' : ''}
                                ${(classChange.blockquote) ? 'pl-16' : ''}
                                ${(classChange.codeSnippet) ? 'bg-slate-200 mx-2' : ''}
                                `} placeholder="Chat comes here..." style={{ resize: "none" }}
                                onFocus={() => {
                                    setShowEmoji(false);
                                }}
                                required></textarea>
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
                                <button type='submit' className='btn btn-sm px-6 bg-green-600 text-white mt-1 mb-2 hover:bg-green-800 border-white'>Send</button>
                                {
                                    showEmoji ?
                                        <div className='absolute  top-40'>
                                            <Picker onEmojiClick={onEmojiClick} />
                                        </div>
                                        :
                                        <></>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatboard;


