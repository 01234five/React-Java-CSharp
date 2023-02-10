import React, { useState, useEffect } from 'react';
import '../css/MessageChat.css';



function MessageChat({ text, user_name_color,user_name }) {
    const [state, ToggleState] = useState(true);   
     

    useEffect(() => {
        // Your code here
          InitialLoad();
        
          return () =>{
            console.log("umount");
          }
      }, []);
      function InitialLoad(){
        
      }     

  return (
    <>
        <div className='message-chat-container'>
            <div className='fa fa-user message-chat-icon'></div>
            <strong className='message-chat-user-name' style={{color:user_name_color} }>{user_name}</strong>
            <div className='message-chat-colon'> : </div>
            <div className='message-chat-text-container'>
                <div className='message-chat-text'>{text}</div>
            </div>
        </div>
    </>
  )
}

export default MessageChat