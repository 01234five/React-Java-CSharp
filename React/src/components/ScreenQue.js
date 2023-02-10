import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../css/ScreenQue.css';
import ScreenQueElement from './ScreenQueElement';




function ScreenQue({ received_parameter, parameter_reference_list_que }) {
    const [state_nav_collapsed, ToggleNav] = useState(true);  
    const [state_display_upload, ToggleDisplayUpload] = useState(false); 
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [state_uploading, setStateUploading] = useState(false);

    var element_button_bottom_text = document.getElementById('button-bottom-form-text');
    var element_button_bottom_icon = document.getElementById('button-bottom-form-icon');
    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
    };
  
    const handleSubmission = async () => {
      received_parameter(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      setStateUploading(true);
      try{
      await axios.post('http://127.0.0.1:8080/upload',formData,{withCredentials: false,headers:{"Content-Type": "multipart/form-data"}})
      .then((response) => 
      {
        console.log(response);
        setStateUploading(false);
        received_parameter(false);
      });
    } catch (e){
      console.log("Axios Error");
      setStateUploading(false);
      received_parameter(false);
    }
      
    };

    useEffect(() => {
        // Your code here
          InitialLoad();
          return () =>{
            console.log("umount");
          }
      }, []);

      useEffect(() =>{
        
      },[state_display_upload])

      function InitialLoad(){
        element_button_bottom_icon=document.getElementById('button-bottom-form-icon');
        element_button_bottom_text = document.getElementById('button-bottom-form-text');
        document.querySelector('.col-right-side-nav-collapsed').addEventListener('transitionend',InitialLoadAddEventListenerMenuScreen ); 
        
      }
      function InitialLoadAddEventListenerMenuScreen(event){
        console.log(event);
        document.querySelector('.col-right-side-nav-collapsed').removeEventListener('transitionend',InitialLoadAddEventListenerMenuScreen);
        }      
 

  return (
    <>
    {(state_uploading) ? (
    <div className="screen-que-container-main">
    <div className="que-scroller">
        <div className="display-uploading-text">...uploading</div>
    </div> 
    <div className="screen-que-container-bottom">
      <div className='screen-que-container-bottom-form' style={{justifyContent: "center"}}>
      <button style={{width:"60%",backgroundColor:"#0c0c0c",border:"0"}}><img src="/thumbnails/thumbnail-logo.png" style={{width:"100%"}}></img></button>
          </div>
      </div>
    </div>
    
    
    ) : (
    <div className="screen-que-container-main">
    
    <div className="que-scroller">
    {(state_display_upload) ? (    <div className='screen-que-container-messages' style={{width:"100%"}}>
      <div className='display-file-upload-header'><strong style={{color:"white",fontSize:"25px"}}>Upload</strong></div>
      
      <div className="display-file-upload-container-button-1" style={{color: "white"}}>
    <label htmlFor="file-upload" className="custom-file-upload">
    <i className="fa fa-cloud-upload"></i> Choose Video
    </label>
			<input id="file-upload" type="file" name="file" onChange={changeHandler} />
      </div>
			{isFilePicked ? (<>
				<div style={{color:"white"}}>
					<p className='display-file-upload-container-info'>Filename: {selectedFile.name}</p>
					<p className='display-file-upload-container-info'>Filetype: {selectedFile.type}</p>
					<p className='display-file-upload-container-info'>Size in bytes: {selectedFile.size}</p>
				</div>
        			<div style={{height: "max-content"}}>
              <button className="display-file-upload-container-button-2" onClick={handleSubmission}><div className='fa fa-upload'></div><strong style={{marginLeft: "5px"}}>Upload</strong></button>
              
            </div>
            </>
			) : (
				<div style={{color:"white"}}>
        <p className='display-file-upload-container-info'>Server Configuration</p>
        <p className='display-file-upload-container-info'>Supported formats: MP4, MOV, AVI, MKV, WMV </p>
        <p className='display-file-upload-container-info'>Allowed max size: 50mb</p>
        </div>
			)}

		</div>) :<> 
      
        {(parameter_reference_list_que.length > 0) ? 
        <><div className="screen-que-container-messages">
        {parameter_reference_list_que.map((que ,i )=>
        que
        )}
        
        </div></> 
        : 
        <><div className="screen-que-container-messages" style={{width:"100%"}}>
        <div style={{height:"100%",display:"flex",alignItems:"center",width:"100%",justifyContent:"center",flexDirection:"column"}}><h3 style={{color:"rgba(255, 255, 255, 0.575)"}}>Empty</h3><h6 style={{color:"rgb(255 255 255 / 25%)",textAlign:"center"}}>press below to add to que</h6></div>
        
        </div></>}
     
       </>}
      


      </div>
      
      <div className="screen-que-container-bottom">
      <div className='screen-que-container-bottom-form'>
          <button onClick={()=>ToggleDisplayUpload(!state_display_upload)} id="id-que-input" className='screen-que-container-bottom-form-button'><>{state_display_upload ? (<><div id="button-bottom-form-icon" className="fa fa-arrow-left screen-que-container-bottom-form-button-text"></div><strong id="button-bottom-form-text" className='screen-que-container-bottom-form-button-text' style={{marginLeft: "5px"}}>Return</strong></>) : (<><div id="button-bottom-form-icon" className="fa  fa-upload screen-que-container-bottom-form-button-text"></div><strong id="button-bottom-form-text" className='screen-que-container-bottom-form-button-text' style={{marginLeft: "5px"}}>Upload</strong></>)}</>
          </button>
          </div>
      </div>
    </div>
    )}
    </>
    
  )
}

export default ScreenQue