package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.Query;
import tr.com.astair.astair.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
	@Query(nativeQuery = true, value = "select * from systemadmin sa where sa.username = :username")
	List<User> findAllByUsername(String username);
}