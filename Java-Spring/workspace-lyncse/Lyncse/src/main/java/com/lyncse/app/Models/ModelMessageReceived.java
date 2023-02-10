package com.lyncse.app.Models;

public class ModelMessageReceived {
	private String user;
	private String user_color;
	private String message;


	public ModelMessageReceived() {

	}

	public ModelMessageReceived(String user,String user_color,String message) {
		this.user= user;
		this.user_color= user_color;
		this.message = message;
	}


	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public  String getUser_color() {
		return user_color;
	}
	public  void setUser_color(String user_color) {
		this.user_color = user_color;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	}


