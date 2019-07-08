/*
package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tr.com.astair.astair.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
*/
package tr.com.astair.astair.repository;
import tr.com.astair.astair.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsernameAndPassword(String username,String password);
	Optional<User> findById(long id);
	int countByUsername(String username);
	List<User> findAllByUsername(String username);
}