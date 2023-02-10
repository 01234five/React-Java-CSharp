import React, { useEffect } from 'react';
import { useState } from "react";
import NabBar from './components/NavBar';
import VideoPlayer from './components/VideoPlayer'
import SideBar from './components/SideBar'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';

function App() {
  //useState // currentState, function to update state = initial state value
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Your code here    

  }, []);


  function ToggleMenu(parameter){
    console.log(parameter);
    var element = document.getElementById("c-app");   
    element.classList.toggle('change-app');   
  }
  return (

    
    
    <div className='container-main'>
        <div className="row" style={{margin:0,height:'100%'}}>
          <div id="c-app"></div>
          <div id="col-video-player" className="col-auto col-left-side-nav-collapsed">
            <VideoPlayer></VideoPlayer>
          </div>
          <div id="col-side-bar" className="col-auto col-right-side-nav-collapsed">
          { 
          //Ternary expression // condition ? <expression if true> : <expression if false>
          show ? <SideBar parent_toggle_menu={ToggleMenu}></SideBar> : null 
          }                        
          </div>
        </div>

    </div>
  );
}

export default App;
