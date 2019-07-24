package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import tr.com.astair.astair.model.ComputerVision;


import java.sql.Timestamp;
import java.util.List;


public interface ComputerVisionRepo extends JpaRepository<ComputerVision, Timestamp> {

    List<ComputerVision> findTop30ByOrderByDateDesc();

    ComputerVision findTopByOrderByDateDesc();

    @Query(nativeQuery = true, value = "SELECT AVG(occupancy) FROM computervision c WHERE c.data_time BETWEEN CURRENT_DATE AND CURRENT_DATE+1")
    Integer getAvePeopleCount();

    @Query(nativeQuery = true, value = "SELECT AVG(female_count) FROM computervision c WHERE c.data_time BETWEEN CURRENT_DATE AND CURRENT_DATE+1")
    Integer getAveFemaleCount();

    @Query(nativeQuery = true, value = "SELECT AVG(male_count) FROM computervision c WHERE c.data_time BETWEEN CURRENT_DATE AND CURRENT_DATE+1")
    Integer getAveMaleCount();

    @Query(nativeQuery = true, value = "SELECT * FROM computervision c WHERE c.data_time BETWEEN CURRENT_DATE AND CURRENT_DATE+1")
    List<ComputerVision> getTodaysData();

}
