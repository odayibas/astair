/*
package tr.com.astair.astair.service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.User;
import tr.com.astair.astair.repository.UserRepository;
import tr.com.astair.astair.service.UserService;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    UserRepository userRepository;

    @Autowired
    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User test){
        return userRepository.save(test);
    }

    public User get(Long id){
        return userRepository.getOne(id);
    }

    public List<User> get(){
        return userRepository.findAll();
    }

    public void update(User test){
        userRepository.save(test);
    }
}
*/

package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.User;
import tr.com.astair.astair.model.UserNames;
import tr.com.astair.astair.repository.UserRepository;
import tr.com.astair.astair.service.UserService;
import java.util.*;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public boolean delete(Long id) {
		if(userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return true;
		}
		else
			return false;
	}

	@Override
	public void update(User user) {
		userRepository.save(user);
	}

	@Override
	public User findUsernameandPassword(String username, String password) {
		return userRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public User getUserAccordingToId(Long id) {
		return userRepository.findById(id).get();
	}

	@Override
	public Collection<User> findAll() {
		Iterable<User> itr = userRepository.findAll();
		return (Collection<User>) itr;
	}

	@Override
	public Long addUser(User user) {
		List<User> list = userRepository.findAllByUsername(user.getUsername());

		if (list.size() > 0) {
			return -1l;
		}

		return userRepository.save(user).getId();
	}

	@Override
	public Long login(String username,String password) {

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

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public boolean checkUniqueUsernames(String username) {
		if(userRepository.countByUsername(username)>0) {
			return true;
		}
		else {
			return false;
		}
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
	public List<User> getAllUsers() {
		List<User> userEntities = new ArrayList<>();
		userRepository.findAll().forEach(e -> {
			userEntities.add(e);
		});
		return userEntities;
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