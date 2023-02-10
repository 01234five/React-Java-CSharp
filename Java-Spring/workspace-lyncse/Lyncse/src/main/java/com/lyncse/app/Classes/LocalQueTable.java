package com.lyncse.app.Classes;

import java.util.ArrayList;
import java.util.List;

import com.lyncse.app.Models.ModelQue;

public class LocalQueTable {
	List<ModelQue> list_que = new ArrayList<ModelQue>();
	
	public void Start(List<ModelQue> list) {
		list_que.addAll(list);
	}
	

}
