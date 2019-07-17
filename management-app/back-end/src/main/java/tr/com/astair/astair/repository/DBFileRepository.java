package tr.com.astair.astair.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

import tr.com.astair.astair.model.DBFile;

@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String> {
	
}