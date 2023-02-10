package com.lyncse.app.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="que")
public class ModelQue {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String videoname;
	private String file;
	private String thumbnail;
	
	public ModelQue() {

	}
	
	public ModelQue(String videoname,String file,String thumbnail) {
		this.videoname= videoname;
		this.file=file;
		this.thumbnail=thumbnail;

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getVideoname() {
		return videoname;
	}

	public void setVideoname(String videoname) {
		this.videoname = videoname;
	}
	
	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
	
	
}
