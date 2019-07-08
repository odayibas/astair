/*
package tr.com.astair.astair.service;

import tr.com.astair.astair.model.User;
import java.util.List;


public interface UserService {

    public User save(User test);

    public User get(Long id);

    public List<User> get();

    public void update(User test);
}
*/
package tr.com.astair.astair.service;
import tr.com.astair.astair.model.User;
import java.util.*;

public interface UserService {
	boolean delete(Long id);
	void update(User user); //save
	boolean checkUniqueUsernames(String username);
	User findUsernameandPassword(String username,String password);
	User getUserAccordingToId(Long id);
	Collection<User> findAll();
	User getUserByIdOne(Long id);
	List<User> getAllUsers();
	User findUserAccordingToUsername(String username);
	Long addUser(User user);
	Long login(String username,String password);
	void updateUser(User user);
	void deleteUser(Long id);
}