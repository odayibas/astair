package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import tr.com.astair.astair.model.ComputerVision;


import java.sql.Timestamp;
import java.util.List;


public interface ComputerVisionRepo extends JpaRepository<ComputerVision, Timestamp> {

    List<ComputerVision> findTop30ByOrderByDateDesc();

    ComputerVision findTopByOrderByDateDesc();

    @Query(nativeQuery = true,value = "SELECT AVG(occupancy) as avgOc ,AVG(female_count) as fmcount,AVG(male_count) as mlcount FROM computervision c WHERE c.data_time BETWEEN CURRENT_DATE - 1 AND CURRENT_DATE")
    List<Object> getTodaysAve();

  @Query(nativeQuery = true,value = "SELECT * FROM computervision c WHERE c.data_time BETWEEN CURRENT_DATE -1 AND CURRENT_DATE")
    List<ComputerVision> getTodaysData();

}
