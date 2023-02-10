import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import '../css/ScreenSettings.css';


function ScreenSettings({ received_parameter,user_name_text ,param_user_color,param_parent_func1,param_parent_func2,param_state_layout,param_state_set_layout}) {
  const [state_change_name, ToggleChangeName] = useState(false);  
  const [state_tos, ToggleTos] = useState(false);   
  const [state_privacy_policy, TogglePrivacyPolicy] = useState(false);   
  const [state_lyncse_info, ToggleLyncseInfo] = useState(false);    
    var user_name;
    var input_palette;

    useEffect(() => {
        // Your code here
          InitialLoad();
    
          return () =>{
            
           
            input_palette.removeEventListener('input', setColorUserName);   
                   
          }
      }, []);

      useEffect(()=>{
        console.log("change layout");
      },[param_state_layout]);

      useEffect(() => {
        // Your code here
            if(state_change_name==true){

            }else{
                user_name= document.getElementById('settings-user-name');
                input_palette = document.getElementById('settings-input-palette');
                input_palette.addEventListener('input', setColorUserName); 
                user_name_text=user_name_text;
                
                
            }
      }, [state_change_name]);      
      function InitialLoad(){
        user_name= document.getElementById('settings-user-name');
        input_palette = document.getElementById('settings-input-palette');
        input_palette.value = param_user_color;
        input_palette.addEventListener('input', setColorUserName);   
       
      }

      function setColorUserName(e) {

        param_parent_func2(e.target.value);
      }       

      function onChangeClick(event){
        if(state_change_name==false){
          
        
        ToggleChangeName(!state_change_name);
        }else{           
            ToggleChangeName(!state_change_name);         
        }
      }

      function onInputChange(event){
        param_parent_func1(event.target.value);
      }

      function ToggleLayouts(){
        if(param_state_layout >0){
          param_state_set_layout(0);
        }else{
          param_state_set_layout(param_state_layout+1);
          console.log("asdasf");
          console.log(param_state_layout);
        }
      }
  return (
    
    <>


    <div className="screen-settings-container-main">
    <div className="settings-scroller">
      <div className="screen-settings-container-messages">


      <div className="screen-settings-container-element-1">
        <div id="screen-settings-container-element-1-row-1-title">Username: </div>
        {
        (!state_change_name) ?
        (<>
        <div className="screen-settings-container-element-1-row-2">      
            <strong id="settings-user-name" style={{color:param_user_color}}>{user_name_text}</strong>
            <div className='settings-input-palette-container'><input id="settings-input-palette" type="color" name="favcolor" defaultValue={param_user_color}/></div>
        </div>
        <div className='screen-settings-container-element-1-row-3-container'>
        <div className="screen-settings-container-element-1-row-3">      
            <button onClick={(e) =>{onChangeClick(e);}} id="screen-settings-container-element-1-row-3-button"><div className='fa fa-chevron-right'>Change</div></button>
        </div>
        </div>
        </> ): (<>
            <div className="screen-settings-container-element-1-row-2">      
            <input onChange={(e)=>{onInputChange(e);}} id="" type="text" defaultValue={user_name_text}/>
        </div>
        <div className='screen-settings-container-element-1-row-3-container'>
        <div className="screen-settings-container-element-1-row-3">      
            <button onClick={(e) =>{onChangeClick(e);}} id="screen-settings-container-element-1-row-3-button"><div className='fa fa-check'>Change</div></button>
        </div>
        </div>
        </>)
        }
        <div className='screen-settings-container-element-1-row-4'><button onClick={()=>{ToggleLayouts();}} id="screen-settings-container-element-1-row-4-title">Toggle Layout</button></div>
       </div>


       <div style={{overflowY:"scroll",color: "white",textAlign: "center"}}>
        {(state_tos) ? <>
        
          
          <h6>Your use of the site is solely at your own risk.
This site may contain links and/or advertisement to third party content,
which i do not warrant, endorse, or assume liability for.</h6>
          
        </> : (state_privacy_policy) ? <> 
        <h3>Privacy Policy</h3>
        <br></br>
        <h5><strong>Links to Other Websites</strong></h5>
        <br/>
        <h6>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</h6>
        <br/>
        <br/>
        <h5><strong>The purposes of processing</strong></h5>
        <br/>
        <h6>The Data concerning the User is collected to allow the Owner to provide its Service, comply with its legal obligations, respond to enforcement requests, protect its rights and interests (or those of its Users or third parties), detect any malicious or fraudulent activity, as well as the following: Displaying content from external platforms and Analytics.</h6>
        <br/>
        <br/>
        <h5><strong>Changes to this privacy policy</strong></h5>
        <br/>
        <h6>The Owner reserves the right to make changes to this privacy policy at any time by notifying its Users on this page and possibly within this Application and/or - as far as technically and legally feasible - sending a notice to Users via any contact information available to the Owner. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom.</h6>
        <br/>
        <br/>
        <h6>This privacy policy relates solely to this Application, if not stated otherwise within this document.</h6>
        
        </> : (state_lyncse_info) ? 
        <><div className='lyncse-info-container'>
          <div className='lyncse-info-container-header'></div>
          <div className='lyncse-info-container-row-1'>
            <div className='lyncse-info-container-row-1-col-1'>
              <div className='lyncse-badge-container' style={{wordBreak:"break-word"}}>
                <div className='lyncse-badge-row-1'>
                  <img src='/Lyncse/avatar/avatar.jfif' style={{borderRadius:"50%",height:"100px"}}></img>
                  <h5 style={{marginTop: "5px"}}><strong>Angel Lopez</strong></h5>
                  <h6>B.S Computer Science | Software Developer | Software Engineer </h6>
                  <h7>Tampa, FL</h7>
                </div>
                <div style={{borderBottom:"1px solid white"}}></div>
                <div>
                  <h6>Contact</h6>
                  <h7>Angellopez@Lyncse.com</h7>
                  <div><a id='linkedin-link' href="https://www.linkedin.com/in/angellopezn">Linkedin</a></div>
              
                </div>
              </div>
            </div>
            </div>
            <div className='lyncse-info-container-footer'></div>
          </div>
        </> : <></>}

        </div>






        <div className='screen-settings-privacy-policy-disclaimer-container'>
       <div className="screen-settings-container-element-3">
        <button id="screen-settings-container-element-3-row-1-title" onClick={()=>{ ToggleTos(false);TogglePrivacyPolicy(!state_privacy_policy);ToggleLyncseInfo(false);}} >Privacy Policy</button>    
       </div>
       <div className="screen-settings-container-element-2">
        <button id="screen-settings-container-element-2-row-1-title" onClick={()=>{ ToggleTos(!state_tos);TogglePrivacyPolicy(false);ToggleLyncseInfo(false);}} >Disclaimer</button>    
       </div>
       </div>     

      </div>
      </div>
      <div className="screen-settings-container-bottom">
      <div className='screen-settings-container-bottom-form'>
          <button onClick={()=>{ToggleTos(false);TogglePrivacyPolicy(false);ToggleLyncseInfo(!state_lyncse_info)}}  className='screen-settings-container-bottom-form-button-lyncse'><img src="/thumbnails/thumbnail-logo.png" style={{width:"100%"}} ></img></button>
          </div>
      </div>
    </div>
    </>
  )
}

export default ScreenSettings