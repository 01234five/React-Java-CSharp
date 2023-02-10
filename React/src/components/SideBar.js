import React, { useState, useEffect } from 'react';
import '../css/SideBar.css';
import '../components/ScreenChat';
import ScreenChat from '../components/ScreenChat';
import ScreenQue from '../components/ScreenQue';
import ScreenSettings from '../components/ScreenSettings';
import MessageChat from './MessageChat';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ScreenQueElement from './ScreenQueElement';
import {Helmet} from "react-helmet";

function SideBar({ parent_toggle_menu }) {
    const [state_nav_collapsed, ToggleNav] = useState(true);   
    const [state_chat_collapsed, ToggleChat] = useState(true); 
    const [state_setting_collapsed, ToggleSetting] = useState(true);      
    const [state_que_collapsed, ToggleQue] = useState(true);  
    const [state_messages, setMessages] = useState();
    const [state_messages_list, setMessagesList] = useState([]);
    const [state_list_que, setListQue] = useState([]);
    const [state_user_name, setUserName] = useState("Anonymous");  
    const [state_user_color, setUserColor] = useState("#DB8FFF");        
    const [ connection, setConnection ] = useState(null);
    const [ state_loading, setLoading ] = useState(true);
    const [state_button_top, setButtonTopDisabled] = useState(false)
    const [state_layout,setLayout]=useState(0);
    const childFunc = React.useRef(null);
    useEffect(() => {
         const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7170/chatHub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        GetMessages();
        UpdateQue();
        setLoading(false);

        return () =>{
            console.log("umount sidebar");
           
            
                   
          }
   }, []);

   async function GetMessages(){
    await axios
    .get('http://127.0.0.1:8080/messages',{withCredentials: false,})
    .then((response) => {     
       var x = [];
       for(var i =0; i < response.data.messages.length;i++) {
           
           var message_text= response.data.messages[i].message;
           var message_user=response.data.messages[i].user;
           var message_color=response.data.messages[i].user_color;
           x.push(<MessageChat text={message_text} user_name_color={message_color} user_name={message_user}></MessageChat>);
                    
       }  
       setMessagesList(x.slice().reverse());      
    })
    .catch((err) => {
       console.log(err);
    });
   }

   useEffect(() => {
    if( typeof state_messages !== "undefined"){
    var arr = state_messages_list.slice();
    arr.push(state_messages);
    setMessagesList(arr);

    if(state_chat_collapsed == false){
    childFunc.current(state_messages);
    }
    }
}, [state_messages]);


useEffect(() => {

}, [state_messages_list]);
useEffect(() => {
    
}, [state_list_que]);

   useEffect(() => {
    //if it updated, do this ->
    if (connection) {
        connection.start()
            .then(result => {
                console.log('SinalR - Connected!');

                connection.on('ReceiveMessage', (user,color,text) => {
                 setMessages(<MessageChat text={text} user_name_color={color} user_name={user}></MessageChat>);               
                });

                connection.on('ReceiveQue', (text) => {
                    console.log("test");
                    console.log(text);
                    if(text == "updateQue"){
                        UpdateQue();
                    }
                   });
            })
            .catch(e => console.log('SinalR - Connection failed: ', e));
    }
}, [connection]);//set to the state variable to check for update

async function UpdateQue(){
    await axios
    .get('http://127.0.0.1:8080/que',{withCredentials: false,})
    .then((response) => {     
       var x = [];
       for(var i =0; i < response.data.que.length;i++) {
           
           var received_text= response.data.que[i].videoname;
           var thumbnail_src ="/thumbnails/" + response.data.que[i].thumbnail
           x.push(<ScreenQueElement text={received_text} image={thumbnail_src}></ScreenQueElement>);
            
       }  
       setListQue(x.slice());  
         
    })
    .catch((err) => {
       console.log(err);
    });
}

function ToggleDomChangeClass(){
    var element = document.getElementById("c-side-bar");
  
    if(element !== null){

        if(state_nav_collapsed){
            element.classList.add('change-side-bar'); 
        } else{
            element.classList.remove('change-side-bar');           
        }
    }
}

  function DomNavCollapsed() {      
    return  <>
                <button onClick={(e) => {parent_toggle_menu("x");ToggleNav(!state_nav_collapsed);ToggleChat(!state_chat_collapsed); ToggleDomChangeClass();}} className="btn btn-custom-style" id="id-button-chat"><i className="fa fa-comment-o fa-icon-style"></i></button>

                <button onClick={() => {parent_toggle_menu("x");ToggleNav(!state_nav_collapsed);ToggleQue(!state_que_collapsed); ToggleDomChangeClass();}} className="btn btn-custom-style"><i className="fa fa-list-ol fa-icon-style"></i></button>
                <button onClick={() => {parent_toggle_menu("x");ToggleNav(!state_nav_collapsed);ToggleSetting(!state_setting_collapsed); ToggleDomChangeClass();}} className="btn btn-custom-style"><i className="fa fa-cog fa-icon-style"></i></button>
            </>;
                            }

  function DomChatOpen() { 
    
    return  <>
                <div className="side-bar-container-chat-open-top">
                    <button onClick={(e) => {parent_toggle_menu("x");ToggleNav(!state_nav_collapsed);ToggleChat(!state_chat_collapsed);ToggleDomChangeClass();}} className="btn btn-custom-style" id="id-button-chat"><div style={{width:"100%",display:"flex",justifyContent:"space-between"}}><div></div><i className="fa fa-comment-o fa-icon-style"></i><i className="fa fa-arrow-right fa-icon-style" aria-hidden="true"></i></div></button>
                </div>
                <div className="side-bar-container-chat-open-main">
                    <ScreenChat parameter_messages={state_messages_list} param_user={state_user_name} param_user_color={state_user_color} parameter_signalr={connection} paremeter_childFun={childFunc} parameter_parentFun={test}></ScreenChat>
                </div>
  
            </>;
    }

  function test(message){
    setMessages(message);
  }


  
  return (
    <>


{(state_layout ==1) ?     <Helmet>
        <link rel="stylesheet" href={process.env.PUBLIC_URL + "/styles/Layout-red.css"} /> 
    </Helmet>:    <Helmet>
        <link rel="stylesheet" href="" /> 
    </Helmet>}

    {(state_loading)  ? (<div></div>) :(<>
    <div id="c-side-bar" className=""></div>
    <div id="id-container-side-bar" className='container-side-bar'>
         {
            state_nav_collapsed &&
            DomNavCollapsed()
         }
         {
            //Ternary expression // condition ? <expression if true> : <expression if false>
            !state_chat_collapsed ? DomChatOpen() : null           
         }
         {            
            (!state_setting_collapsed)  ? 
            (<>
            
            <div className="side-bar-container-chat-open-top">
            <button onClick={() => {parent_toggle_menu("x");ToggleNav(!state_nav_collapsed);ToggleSetting(!state_setting_collapsed);ToggleDomChangeClass();}} className="btn btn-custom-style"><div style={{width:"100%",display:"flex",justifyContent:"space-between"}}><div></div><i className="fa fa-cog fa-icon-style"></i><i className="fa fa-arrow-right fa-icon-style" aria-hidden="true"></i></div></button>
            </div>
            <div className="side-bar-container-chat-open-main">
            <ScreenSettings param_state_layout={state_layout} param_state_set_layout={setLayout} user_name_text={state_user_name} param_user_color={state_user_color} param_parent_func1={setUserName} param_parent_func2={setUserColor}></ScreenSettings>
            </div>
            </>) : null
         } 
         {
          (!state_que_collapsed) ?
          (<>

                <div className="side-bar-container-chat-open-top">
                    <button disabled={state_button_top} onClick={(e) => {parent_toggle_menu("x");ToggleNav(!state_nav_collapsed);ToggleQue(!state_que_collapsed);ToggleDomChangeClass();}} className="btn btn-custom-style" id="id-button-chat"><div style={{width:"100%",display:"flex",justifyContent:"space-between"}}><div></div><i className="fa fa-list-ol fa-icon-style"></i><i className="fa fa-arrow-right fa-icon-style" aria-hidden="true"></i></div></button>
                </div>
                <div className="side-bar-container-chat-open-main">
                    <ScreenQue received_parameter={setButtonTopDisabled} parameter_reference_list_que={state_list_que}></ScreenQue>
                </div>         
          </>) : null         
         }       
    </div></>)
    }
    </>
  )
}

export default SideBar