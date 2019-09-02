package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tr.com.astair.astair.model.Admin;
import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query(nativeQuery = true, value = "select * from admin")
    List<Admin> getSlots();
}
