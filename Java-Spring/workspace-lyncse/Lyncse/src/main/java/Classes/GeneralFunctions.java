package Classes;

import java.io.File;

public class GeneralFunctions {

		  public static void DeleteFile(String file, String dir){
		    File myObj = new File(dir+file); 
		    if (myObj.delete()) { 
		      System.out.println("Deleted the file: " + myObj.getName());
		    } else {
		      System.out.println("Failed to delete the file.");
		    } 
		  } 
		
}
