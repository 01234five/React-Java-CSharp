package com.lyncse.app.Models;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
@Entity
@Table(name="messages")
public class ModelMessage {
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
private Integer id;
private String user;
private String user_color;
private String message;


public ModelMessage() {

}

public ModelMessage(String user,String user_color,String message) {
	this.user= user;
	this.user_color= user_color;
	this.message = message;
}

public Integer getId() {
	return id;
}

public void setId(Integer id) {
	this.id = id;
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
