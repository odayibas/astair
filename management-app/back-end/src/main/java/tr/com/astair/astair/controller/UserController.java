package tr.com.astair.astair.controller;

import tr.com.astair.astair.controller.api.UserControllerApi;
import tr.com.astair.astair.model.User;
import tr.com.astair.astair.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;

@RestController(value="/user")
public class UserController implements UserControllerApi {
	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	public ResponseEntity<String> registerUser(@RequestBody User user){
		Long id = userService.addUser(user);
		if(id == -1) {
			return new ResponseEntity<String>("User " + user.getUsername() + " already exists.", HttpStatus.CONFLICT);
		}
		return new ResponseEntity<String>("User " + user.getUsername() + " registered successfully.", HttpStatus.OK);
	}

	public ResponseEntity<User> getUserByIdToUsername(@PathVariable("id") Long id){
		User user = userService.getUserByIdOne(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	public ResponseEntity<Long> loginUser(String username, String password) {
		return new ResponseEntity<>( (Long) userService.login(username,password), HttpStatus.OK);
	}

	public ResponseEntity<User> updateUser(@RequestBody User user) {
		userService.updateUser(user);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id){
		userService.deleteUser(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}