package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.Survey;

import java.util.List;

public interface SurveyRepository  extends JpaRepository<Survey, Long> {

    @Query(nativeQuery = true, value = "select * from survey p where p.id=(select MAX(w.id) from survey w)")
    List<Survey> get();

    @Query(nativeQuery = true, value = "select  * from survey p where p.id=(select MAX(w.id) from survey w)")
    List<Survey> write();
}
