import React, { useState, useEffect } from 'react';
import Hls from "hls.js";
import '../css/VideoPlayer.css';

function VideoPlayer() {

    useEffect(() => {
        // Your code here
        var video = document.getElementById('video');
        if(Hls.isSupported()) {
          var hls = new Hls();
          //hls.loadSource('http://localhost:9090/hls/stream.m3u8');
          hls.loadSource('http://localhost:9090/hls/stream.m3u8');
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED,function() {
            //video.play();
        });
       }
       // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
       // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
       // This is using the built-in support of the plain video element, without using hls.js.
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          //video.src = 'https://video-dev.github.io/streams/https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8/x36xhzz.m3u8';
          video.src = 'http://localhost:9090/hls/stream.m3u8';
          video.addEventListener('canplay',function() {
            //video.play();
          });
        }
      }, []);

  function ToggleMediaButton(){
    var element = document.getElementById("media_button_icon");
    if(element != null){     
    element.classList.toggle('fa-play');
    element.classList.toggle('fa-pause');    
    }
    var element = document.getElementById("media_controls");
    if(element != null){
        element.classList.toggle('controls'); 
        element.classList.toggle('controls-hidden');
    }
  }


  function Play(){
        var video = document.getElementById('video');
        if(video.paused){
          video.play()
      }
      else{
          video.pause()
      }
  }

  return (
    <>
    <div className="container-video" style={{backgroundColor: 'black'}}>
    <video id="video" autoPlay={ true }></video>
    <div id="media_controls" className="controls">
            <button id="media_button" onClick={() => (Play())}><i id="media_button_icon" className="fa fa-play icon_media-height" onClick={() => ToggleMediaButton()}></i></button>
        </div>
    </div>       
    </>
  )
}

export default VideoPlayer