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

    @Query(nativeQuery = true, value = "select * " +
            "from sensor s " +
            "where s.id = any (select max(r.id) " +
                "from sensor r " +
                "where r.ac_id = :ac_zone " +
                "group by to_char(r.date_time, 'HH24') " +
            ") " +
            "order by s.id desc " +
            "limit 5 "
    )
    List<Sensor> getLast(@Param("ac_zone") Integer ac_zone);

    // get average degree of a sensor
    @Query(nativeQuery = true, value = "select AVG(sensor_degree) as sensor_degree  from(select * from sensor s where s.ac_id = :ac_id ORDER BY Id desc LIMIT 30)as s1 group by s1.ac_id having s1.ac_id = :ac_id ")
    Float getSensorDegreeAve(@Param("ac_id") Integer ac_id);

    // get average degree of all sensor
    @Query(nativeQuery = true, value = "select AVG(sensor_degree) as sensor_degree  from(select * from sensor s ORDER BY Id desc LIMIT 30) as s1")
    Float getAllSensorDegreeAve();

    // recently get degree of a sensor
    @Query(nativeQuery = true, value = "select sensor_degree from sensor s where s.ac_id = :ac_id ORDER BY Id desc LIMIT 1")
    Float getSensorLastDegree(@Param("ac_id") Integer ac_id);

    @Query(nativeQuery = true, value = "select max(ac_id) from sensor s")
    Integer getSensorCount();

    // get average humidity of a sensor
    @Query(nativeQuery = true, value = "select AVG(humidity) as humidity  from(select * from sensor s where s.ac_id = :ac_id ORDER BY Id desc LIMIT 30)as s2 group by s2.ac_id having s2.ac_id = :ac_id ")
    Float getSensorHumidityAvg(@Param("ac_id") Integer ac_id);
    
    // get average humidity of all sensor
    @Query(nativeQuery = true, value = "select AVG(humidity) as humidity from(select * from sensor s ORDER BY Id desc LIMIT 30) as s2")
    Float getAllSensorsAvgHumidity();

}
