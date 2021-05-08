import React from 'react'
import {projectFirestore,projectAuth} from '../firebase/config'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {useState, useRef} from 'react';
import firebase from 'firebase/app';
import useFirestore from "../hooks/useFirestore";



const ChatRoom = () =>{
    // const {docs} = useFirestore('image-gallery');
    const dummy = useRef('')
    const messageRef = projectFirestore.collection("messages");
    const query  = messageRef.orderBy('createdAt').limit(25);
    const [formvalue, setFormValue] = useState('');
    // const [urlImg, setUrl] = useState(null);
    const [messages] = useCollectionData(query, {idField: 'id'});
    
    const sendMessage = async(e) => {

        e.preventDefault();
        const {uid, photoURL, displayName} = projectAuth.currentUser;
        if (
            // todoValue === <strong>[&rlm;&rlm;&lrm;]</strong> ||
            // todoValue?.trim() == " ‏‏‎ " ||
            formvalue === ` ‏‏‎ ` ||
            formvalue === undefined ||
            formvalue === "" ||
            formvalue?.trim() === ""
          ) {
            alert("Enter Proper Message");
          }else{
            await messageRef.add({
                text: formvalue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                displayName,
                uid,
                photoURL
            })
            setFormValue('');
                        
            dummy.current.scrollIntoView({ behavior: 'smooth' });
                  
          } 
    }

        
    return (<>
        
        {/* style={{backgroundImage: `url(${urlImg})`}} */}
        <main className="message-section" >
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
            <span ref={dummy}> </span>
        </main>        

        <form className="submit-form" onSubmit={sendMessage}>

        <input value={formvalue} onChange={(e)=> setFormValue(e.target.value)} placeholder="Type a message"></input>
        <button type="submit"
        disabled={!formvalue}>🗣</button>
        </form>
    
    </>
        
    )
}


const ChatMessage = (props) =>{
    const { text, uid , photoURL, displayName} = props.message;

    const messageClass = uid === projectAuth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
        <div className={`message ${messageClass}`}><span className="display-name">{displayName}</span></div>
        <div className={`message ${messageClass}`}>
            
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="user-icon"/>
            
            <p>{text}</p>
           
        </div>
        
        </>
    )

}


export default ChatRoom;