package tr.com.astair.astair.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.ComputerVision;

import java.sql.Timestamp;
import java.util.List;


public interface ComputerVisionRepo extends JpaRepository<ComputerVision, Timestamp>, PagingAndSortingRepository<ComputerVision, Timestamp> {

    List<ComputerVision> findTop30ByOrderByDateDesc();

    ComputerVision findTopByOrderByDateDesc();

    @Query(nativeQuery = true, value = "select * from ComputerVision c where c.id like 'time%'")
    List<ComputerVision> getIdforManage(@Param("time") String time);


}
