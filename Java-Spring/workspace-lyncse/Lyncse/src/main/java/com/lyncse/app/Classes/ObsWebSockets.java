package com.lyncse.app.Classes;


import java.util.ArrayList;
import java.util.List;

import javax.security.auth.x500.X500Principal;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;



import com.google.gson.JsonObject;
import com.lyncse.app.QueRepository;
import com.lyncse.app.Models.ModelQue;

import io.obswebsocket.community.client.OBSRemoteController;
import io.obswebsocket.community.client.message.event.mediainputs.MediaInputPlaybackEndedEvent;
import lombok.experimental.var;
import com.lyncse.app.Classes.GeneralFunctions;

@SuppressWarnings("deprecation")
@Component
public class ObsWebSockets {
	OBSRemoteController controller;
	Boolean obs_connected = false;
	
	String previous_video_file = "";
	String previous_video_thumbnail="";
	@Autowired
	QueRepository queRepository;
	
	SignalR signalr;
	
	public ObsWebSockets(QueRepository q,SignalR sr) {
		queRepository = q;
		signalr=sr;
		Start();
		
	}

			private void Start() {

				controller = OBSRemoteController.builder()
						  .host("192.168.254.134")                  // Default host
						  .port(4455)                         // Default port
						  .password("l0alKjnZRfqkHxy9")   // Provide your password here
						  .connectionTimeout(5)               // Seconds the client will wait for OBS to respond
						  .lifecycle()
						    .onReady(()->{obs_connected=true;System.out.println("obs connected: "+obs_connected);SetSourceNone();})
						    .onDisconnect(()-> {obs_connected=false;System.out.println("obs connected: "+obs_connected);})
						    .and()
						  .registerEventListener(
								  MediaInputPlaybackEndedEvent.class, (event) -> {System.out.println(event);OnVideoEnded();VerifyQue();}
								  )
						  .build();
						controller.connect();
						
						
						
			}
	
			
			public void CreateThread() {
				  Runnable runnable_thumbnail_create = () ->{
					 
						  Start();
				
				  };
				  
				  Thread run = new Thread(runnable_thumbnail_create);
				  run.start();
			}
			
			public void VerifyQue() {				
				var x = queRepository.getQueRecordFirst();
				if(x != null) {
					StartVideo(x.getFile());
				}			
			}
			
			private void OnVideoEnded() {
				var x = queRepository.getQueRecordFirst();
				queRepository.deleteQueRecord(x.getId());				
				signalr.SendMessage("updateQue");
				Classes.GeneralFunctions.DeleteFile(previous_video_file,"C:\\upload\\");
				Classes.GeneralFunctions.DeleteFile(previous_video_thumbnail,"C:\\Users\\Angel\\OneDrive\\Desktop\\Programming\\Codes\\Websites\\ReactjsWebsite\\watchrandomvideos\\public\\thumbnails\\");
				previous_video_file=x.getFile();
				previous_video_thumbnail=x.getThumbnail();

			}
			
			private void StartVideo(String file) {

				JsonObject json = new JsonObject();
				json.addProperty("local_file", "C:/Upload/"+file);
				controller.setInputSettings("Media Source", json, true, (e)->{System.out.println(e);});
			}
			private void SetSourceNone() {
				JsonObject json = new JsonObject();
				json.addProperty("local_file", "");
				controller.setInputSettings("Media Source", json, true, (e)->{System.out.println(e);});
			}
			
			public void VerifyMediaState() {
				
				controller.getMediaInputStatus("Media Source", (e)->{
					System.out.println(e.getMediaState()+ " " + e.getMediaDuration());
					System.out.println(e);					
					if(e.getMediaDuration() == null) {
						VerifyQue();
					}else
					if( e.getMediaDuration().toString().equals("0")) {
				
						VerifyQue();
					}

				});
					
			}
			

					
			
}
