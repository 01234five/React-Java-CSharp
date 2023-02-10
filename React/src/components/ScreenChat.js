import React, { useState, useEffect } from 'react';
import '../css/ScreenChat.css';
import MessageChat from './MessageChat';
import  {HubConnectionBuilder}  from '@microsoft/signalr';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import 'emoji-picker-element';
var arr_messages_screen_chat = []

function ScreenChat({ parameter_messages,param_user,param_user_color, parameter_signalr,paremeter_childFun,parameter_parentFun}) {
    var element_input= document.getElementById('id-input'); 
    var scroller =document.getElementById('id-screen-chat-scroller');
    const [state_show_emojis, ToggleEmojis] = useState(false);   
    useEffect(() => {
        // Your code here
          InitialLoad();
          
          return () =>{
            console.log("umount");
          }
      }, []);

      useEffect(() => {
        if(state_show_emojis){
          ElementEmoji();
          ElementEmojiStyle(true);
          scroller.scrollTop=0;
        }else{
          
          ElementEmojiStyle(false);
        }  
        //cleanup function 
        return() => {

        };
      }, [state_show_emojis]);


      function InitialLoad(){
        arr_messages_screen_chat.length= 0;
        document.querySelector('.col-right-side-nav-collapsed').addEventListener('transitionend',InitialLoadAddEventListenerMenuScreen );     
        paremeter_childFun.current = message_receive; 
        element_input = document.getElementById('id-input'); 
        scroller= document.getElementById('id-screen-chat-scroller')

      }
      function ElementEmojiStyle(emoji_window_opened){
        var x = document.getElementById("screen-chat-icon-emoji");
        if(emoji_window_opened){
          
          x.style.color="#ff00d1"
        }else{
          x.style.color="black"
        }
      }
      function ElementEmoji(){

        
        const style = document.createElement('style');
        style.textContent = `/* ===== Scrollbar CSS ===== */
        /* Firefox */
        * {
          scrollbar-width: none;
          scrollbar-color: #1b1b1b00 #1b1b1b00;
        }
      
        *:hover {
          scrollbar-width: none;
          scrollbar-color: #1b1b1b #1b1b1b;
        }
      
        /* Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
          width: 9px;
        }
      
        *::-webkit-scrollbar-track {
          background: #ffffff00;
        }
      
        *::-webkit-scrollbar-thumb {
          background-color: #1b1b1b00;
          border-radius: 10px;
          border: 3px solid #1b1b1b00;
        }
        *::-webkit-scrollbar-thumb {
          box-shadow: inset 0 0 0 10px;
        }
      `
        var picker = document.querySelector('emoji-picker');
        console.log(picker);
        picker.shadowRoot.appendChild(style);
        picker.addEventListener('emoji-click', OnEmojiClick);
      }

      function OnEmojiClick(event){
      
        typeInTextarea(event.detail.unicode);
      }

      function typeInTextarea(newText, el =document.getElementById("id-input")) {
        const start = el.selectionStart
        const end = el.selectionEnd
        const text = el.value
        const before = text.substring(0, start)
        const after  = text.substring(end, text.length)
        el.value = (before + newText + after)
        el.selectionStart = el.selectionEnd = start + newText.length
        el.focus()
      }

      function InitialLoadAddEventListenerMenuScreen(event){
        document.querySelector('.col-right-side-nav-collapsed').removeEventListener('transitionend',InitialLoadAddEventListenerMenuScreen);
        }      

 
      function DomInputShow(){
        return <>    
          <div className='screen-chat-container-bottom-form'>
          <input id="id-input" onKeyDownCapture={(e)=>{
            if(e.key === 'Enter'){
              e.preventDefault(); // Ensure it is only this code that runs
              send(param_user,param_user_color,element_input.value );element_input.value = '';              
          }
          }} className='screen-chat-container-bottom-form-input' placeholder='Chat' aria-label="Chat"></input>
          <button className='screen-chat-container-bottom-form-button-emoji' onClick={(e)=>{if(state_show_emojis==true){
                      var picker = document.querySelector('emoji-picker');
                      picker.removeEventListener('emoji-click', OnEmojiClick);
          };ToggleEmojis(!state_show_emojis);}}><i id="screen-chat-icon-emoji" className="fa fa-smile-o" aria-hidden="true"></i></button>
          <button className='screen-chat-container-bottom-form-button' onClick={(e)=>{send(param_user,param_user_color,element_input.value );element_input.value = '';}}><div id="screen-chat-icon" className="fa fa-paper-plane" style={{color:'white'}}></div></button>
          
          </div>
          </>
      }
      function send(user,user_color,text){   
        parameter_signalr.invoke("SendMessage",user, user_color,text).catch(function (err) {
          return console.error(err.toString());     
      });
      parameter_parentFun(<MessageChat text={text} user_name_color={user_color} user_name={user}></MessageChat>)  
      }

      function message_receive(message_received){
        
        if(state_show_emojis){
          console.log("f");
          scroller.scrollTop= 0;
        }
        }
      


  return (
    <>
    <div className="screen-chat-container-main">
    <div id="id-screen-chat-scroller" className="scroller">
      <div className="scroller-container" style={{width:"100%"}}>
      <div className="screen-chat-container-messages">
      {parameter_messages.map((message ,i )=>
        message
        )}
      </div>
      {(state_show_emojis) ?
      <div className='scroller-footer' style={{width:"100%"}}><div style={{color:"white"}}>Close</div><emoji-picker ></emoji-picker>
      </div> : <></>}
      </div>
      </div>
      <div className="screen-chat-container-bottom">
        {(DomInputShow())}
      </div>
    </div>
    </>
  )
}

export default ScreenChat