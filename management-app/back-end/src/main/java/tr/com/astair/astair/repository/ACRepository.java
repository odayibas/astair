package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.AC;

public interface ACRepository extends JpaRepository<AC, Long> {

    @Query(nativeQuery = true, value = "select * from ac where ac.ac_id=:id ORDER BY ac.id desc LIMIT 1")
    AC getIdforManage(@Param("id") Integer ac_id);

    @Override
    void deleteAll();

    // get average degree of all AC
    @Query(nativeQuery = true, value = "select AVG(ac_degree) as ac_degree  from(select * from AC ac ORDER BY Id desc LIMIT 30) as ac1")
    Float getAllACDegreeAvg();
    
    // get average degree of an AC
    @Query(nativeQuery = true, value = "select AVG(ac_degree) as ac_degree  from(select * from AC ac where ac.ac_id = :ac_id ORDER BY Id desc LIMIT 30)as ac group by ac.ac_id having ac.ac_id = :ac_id ")
    Float getACDegreeAvg(@Param("ac_id") Integer ac_id);

}
