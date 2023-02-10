package com.lyncse.app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;

import com.lyncse.app.Models.ModelQue;

@Service
@Configurable
public class ServiceQue {
    @Autowired
    private QueRepository queRepository;

    public ServiceQue() {

    }

    public List<ModelQue> getQue(){
        return (List<ModelQue>) queRepository.getQue(); 

    }
    
    public void AddQue(String file_name_no_extension,String string_random,String fileName) {
    
    queRepository.addQue(file_name_no_extension,string_random+fileName,string_random+file_name_no_extension+".jpg");
    }
}
