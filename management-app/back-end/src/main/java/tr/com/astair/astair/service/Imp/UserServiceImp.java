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
