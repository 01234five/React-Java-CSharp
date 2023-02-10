package com.lyncse.app.Models;

public class ModelQueReceived {
	private String videoname;
	private String file;
	private String thumbnail;
	
	public ModelQueReceived() {

	}
	
	public ModelQueReceived(String videoname,String file,String thumbnail) {
		this.videoname= videoname;
		this.file=file;
		this.thumbnail=thumbnail;

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
