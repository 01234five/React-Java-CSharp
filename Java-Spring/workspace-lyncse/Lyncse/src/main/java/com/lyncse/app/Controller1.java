package com.lyncse.app;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org. springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.lyncse.app.Classes.GeneralFunctions;
import com.lyncse.app.Classes.ObsWebSockets;
import com.lyncse.app.Classes.SignalR;
import com.lyncse.app.Models.ModelMessage;
import com.lyncse.app.Models.ModelQue;
import com.lyncse.app.Models.ModelMessageReceived;


@Controller
public class Controller1 {
@Autowired
	MessageRepository messageRepository;
@Autowired
	QueRepository queRepository;
SignalR signalr = new SignalR();
GeneralFunctions general_functions = new GeneralFunctions();
@Autowired
ObsWebSockets obs_websocket;


@CrossOrigin
@GetMapping("/messages")
public @ResponseBody Map<String, ?> messages(){
	
	List<ModelMessage> messageResult = messageRepository.getLast20();
	Map<String, List> map = new HashMap<String,List>();
	map.put("messages", messageResult);
	return map;
}


@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/que")
public @ResponseBody Map<String, ?> que(){
	List<ModelQue> queResult = queRepository.getQue();
	Map<String, List> map = new HashMap<String,List>();
	map.put("que", queResult);
	return map;
}





@PostMapping("/addMessageParams")
public @ResponseBody void addMessage(@RequestParam String user, @RequestParam String user_color, @RequestParam String message) {
	messageRepository.addMessage(user,user_color,message);
	return;
}

@PostMapping("/addMessage")
public @ResponseBody void addMessage(@RequestBody ModelMessageReceived message ) {
	var user = message.getUser();
	var user_color = message.getUser_color();
	var message_received = message.getMessage();
	messageRepository.addMessage(user,user_color,message_received);
	return;
}

@CrossOrigin(origins = "http://localhost:3000")
@PostMapping("/upload") 
public ResponseEntity<?> handleFileUpload( @RequestParam("file") MultipartFile file ) {
  String string_random = org.apache.commons.lang3.RandomStringUtils.randomAlphabetic(10);	
  String fileName = file.getOriginalFilename();
  String file_name_no_extension=fileName;
  String file_type = file.getContentType();
  Boolean file_type_allowed= general_functions.VerifyVideoType(file_type);
  if(file_type_allowed != true) {
	  System.out.println("Upload - Unsupported file format.");
      return new ResponseEntity<>(
              "Unsupported file format.", 
              HttpStatus.FORBIDDEN);    
  }
  if(fileName.indexOf(".")>0) {//Check if it has extension
	file_name_no_extension= fileName.substring(0,fileName.lastIndexOf("."));//use substring to create new string getting rid of extension  
  }
  try {
    file.transferTo( new File("C:\\upload\\" +string_random+fileName));
  } catch (Exception e) {
	  System.out.println(e);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
  } 

  try {
	general_functions.ThumbnailCreate(string_random+fileName,string_random+file_name_no_extension);
} catch (InterruptedException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
	//failed to create thumbNail , set as default
}
  
  
  queRepository.addQue(file_name_no_extension,string_random+fileName,string_random+file_name_no_extension+".jpg");
  
  obs_websocket.VerifyMediaState();
  
  signalr.SendMessage("updateQue");
  System.out.println("Upload - Completed");
  return ResponseEntity.ok("File uploaded successfully.");
}



}
