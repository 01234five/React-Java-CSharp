package com.lyncse.app.Classes;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class GeneralFunctions {
	public void ThumbnailCreate(String file_name, String output_jpeg_name) throws InterruptedException{
		try {
			
			final List<String> commands = new ArrayList<String>(); 
			commands.add("cmd.exe");
			commands.add("/C");
			commands.add("ffmpeg");
			commands.add("-i");
			commands.add("\""+file_name+"\"");
			commands.add("-ss");
			commands.add("00:00:01.000");
			commands.add("-vframes");
			commands.add("1");
			commands.add("C:\\Users\\Angel\\OneDrive\\Desktop\\Programming\\Codes\\Websites\\ReactjsWebsite\\watchrandomvideos\\public\\thumbnails\\"+output_jpeg_name+".jpg");
			ProcessBuilder pb = new ProcessBuilder(commands);
			pb.directory(new File("C:\\\\upload"));
			Process p =pb.start();
			InputStream is = p.getErrorStream();
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader br = new BufferedReader(isr);
			String line;
			while((line = br.readLine())!=null);
			p.waitFor();
			System.out.println("Created thumbnail to wwwroot/thumbnails");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public Boolean VerifyVideoType(String file_type) {
		if(file_type.equals("video/x-matroska") || 
				file_type.equals("video/mp4") ||
				file_type.equals("video/quicktime")||
				file_type.equals("video/x-msvideo")||
				file_type.equals("video/x-ms-wmv")) {
			
			return true;
		}
		else {
			return false;
		}
	}
	
	public void CreateThread(String file_name,String file_name_no_extension ) {
		  Runnable runnable_thumbnail_create = () ->{
			  try {
					ThumbnailCreate(file_name,file_name_no_extension);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		  };
		  
		  Thread run = new Thread(runnable_thumbnail_create);
		  run.start();
	}
}
