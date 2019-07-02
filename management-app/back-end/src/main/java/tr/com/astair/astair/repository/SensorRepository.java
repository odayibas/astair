package tr.com.astair.astair.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.Sensor;

import java.util.List;


public interface SensorRepository extends JpaRepository<Sensor, Long>, PagingAndSortingRepository<Sensor, Long> {

    @Query(nativeQuery = true, value = "select * from sensor s where s.ac_id = :ac_id ORDER BY Id desc LIMIT 30")
    List<Sensor> getIdforManage(@Param("ac_id") Integer ac_id);

    @Query(nativeQuery = true, value = "select AVG(sensor_degree) as sensor_degree  from(select * from sensor s where s.ac_id = :ac_id ORDER BY Id desc LIMIT 30)as s1 group by s1.ac_id having s1.ac_id = :ac_id ")
    Float getSensorDegreeAve(Integer ac_id);

    @Query(nativeQuery = true, value = "select AVG(sensor_degree) as sensor_degree  from(select * from sensor s ORDER BY Id desc LIMIT 30) as s1")
    Float getAllSensorDegreeAve();
}
