package com.lyncse.app;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.lyncse.app.Models.ModelQue;

@Transactional
public interface QueRepository extends JpaRepository<ModelQue, Integer> {
	@Query(value= "SELECT * FROM que ORDER BY id", nativeQuery = true)
	List<ModelQue> getQue(); 

	@Query(value= "SELECT file FROM que ORDER BY id", nativeQuery = true)
	List<ModelQue> getQueAttributeFile(); 
	
	@Query(value = "SELECT * FROM que LIMIT 1;", nativeQuery = true)
	ModelQue getQueRecordFirst();

	@Modifying
	@Query(value = "INSERT INTO que (videoname,file,thumbnail) VALUES (?,?,?)", nativeQuery = true)
	void addQue(@Param("videoname")String videoname,@Param("file")String file,@Param("thumbnail")String thumbnail);

	@Modifying
	@Query(value = "DELETE FROM que WHERE id = :id", nativeQuery=true)
	void deleteQueRecord(int id);
}
