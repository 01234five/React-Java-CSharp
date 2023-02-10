package com.lyncse.app;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lyncse.app.Models.ModelMessage;
import org.springframework.transaction.annotation.Transactional;


@Transactional
public interface MessageRepository extends JpaRepository<ModelMessage, Integer> {
@Query(value= "SELECT * FROM messages ORDER BY id DESC LIMIT 20", nativeQuery = true)
List<ModelMessage> getLast20(); 


@Modifying
@Query(value = "INSERT INTO messages (user,user_color,message) VALUES (?,?,?)", nativeQuery = true)
void addMessage(@Param("user")String user,@Param("user_color")String user_color,@Param("message")String message);
}
