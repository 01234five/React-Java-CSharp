import React, { useState, useEffect } from 'react';
import '../css/ScreenQueElement.css';




function ScreenQueElement({ received_parameter, text, image }) {
    const [state_nav_collapsed, ToggleNav] = useState(true);   
     

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
    <div className="screen-que-videos-element-container">
        <div className="screen-que-videos-element-container-image"><img className='screen-que-videos-element-image' src={image}></img></div>
        <div className='screen-que-videos-element-text-container'>
                <div className='screen-que-videos-element-text'>{text}</div>
            </div>

    </div>

    </>
  )
}

export default ScreenQueElement
