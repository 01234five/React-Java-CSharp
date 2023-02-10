package com.lyncse.app.Classes;





import org.springframework.stereotype.Component;

import com.microsoft.signalr.HubConnection;
import com.microsoft.signalr.HubConnectionBuilder;



@Component
public class SignalR {
	private HubConnection hubConnection;
	public SignalR(){
		hubConnection = HubConnectionBuilder.create("http://localhost:5170/chatHub")
		        .build();
		

		hubConnection.<String,String,String>on("ReceiveMessage", (user,user_color,message)->{
			
		},String.class,String.class,String.class);
		
		hubConnection.on("ReceiveQue", (param1)->{
			
		},String.class);
		
		hubConnection.start().blockingAwait();
	
		hubConnection.onClosed(exception -> {
            //do something
            //attempt to connect
            //note: exception is null when the user stop connection
			hubConnection.start().blockingAwait();
        });
		

				
	}
	




	public void SendMessage(String message) {
		hubConnection.send("SendQue", message );
		
	}
	
	
}
