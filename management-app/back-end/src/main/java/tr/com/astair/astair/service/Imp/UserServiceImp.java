package tr.com.astair.astair.service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.User;
import tr.com.astair.astair.repository.UserRepository;
import tr.com.astair.astair.service.UserService;

import java.util.*;

@Service
public class UserServiceImp implements UserService {

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Autowired
	private UserRepository userRepository;

	@Override
	public Long addUser(User user) {
		List<User> list = userRepository.findAllByUsername(user.getUsername());

		if (list.size() > 0) {
			return -1l;
		}

		return userRepository.save(user).getId();
	}

	@Override
	public Long login(String username, String password) {

		List<User> userEntityList = userRepository.findAllByUsername(username);
		if(userEntityList.size() <= 0) {
			return -2l;
		}

		User userE = userEntityList.get(0);
		if (!userE.getPassword().equals(password)) {
			return -1l;
		}
		return userE.getId();
	}

	@Override
	public void updateUser(User user) {
		userRepository.save(user);
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public User findUserAccordingToUsername(String username) {
		List<User> userEntityList = userRepository.findAllByUsername(username);
		if(userEntityList.size() > 0) {
			return null;
		}
		return userEntityList.get(0);
	}

	@Override
	public User getUserByIdOne(Long id) {
		Optional<User> userEntity = this.userRepository.findById(id);
		if (userEntity.isPresent()) {
			return userEntity.get();
		} else {
			return null;
		}
	}
}