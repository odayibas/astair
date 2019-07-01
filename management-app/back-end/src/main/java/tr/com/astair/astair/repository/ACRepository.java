package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.AC;

import java.util.List;

public interface ACRepository extends JpaRepository<AC, Long> {

    @Query(nativeQuery = true, value = "select * from ac where id=?1 ORDER BY ac_time desc LIMIT 30")
    List<AC> getIdforManage(@Param("id") Long id);

}
