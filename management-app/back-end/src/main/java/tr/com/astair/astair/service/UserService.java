package tr.com.astair.astair.service;

import tr.com.astair.astair.model.User;

public interface UserService {
	User getUserByIdOne(Long id);
	User findUserAccordingToUsername(String username);
	Long addUser(User user);
	Long login(String username, String password);
	void updateUser(User user);
	void deleteUser(Long id);
}