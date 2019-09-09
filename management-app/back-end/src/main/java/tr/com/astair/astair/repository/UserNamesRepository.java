package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tr.com.astair.astair.model.UserNames;

import java.util.List;

public interface UserNamesRepository extends JpaRepository<UserNames, Long> {
    @Query(nativeQuery = true, value = "select * from user_names")
    List<UserNames> getNames();
}
