package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.AC;


public interface ACRepository extends JpaRepository<AC, Long> {

    @Query(nativeQuery = true, value = "select * from ac where ac_id=?1 ORDER BY ac_time desc LIMIT 1")
    AC getIdforManage(@Param("id") Integer ac_id);


    @Query(nativeQuery = true, value = "select MAX(ac_id) from ac ")
    Integer getACCount();

}
