package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.User;

public interface UserControllerApi{
	@PostMapping(value="/user/register")
	ResponseEntity<String> registerUser(@RequestBody User user);

	//@PostMapping(value="/user/{id}")
	//ResponseEntity<User> getUserByIdToUsername(@PathVariable("id") Long id);

	@PostMapping(value="/user/{id}")
	ResponseEntity<User> getUserByIdToUsername(@PathVariable("id") Long id);

	@PostMapping(value="/user/login/{username}/{password}")
	ResponseEntity<Long> loginUser(@PathVariable("username") String username, @PathVariable("password") String password);

	@PutMapping(value="/user/update")
	ResponseEntity<User> updateUser(@RequestBody User user);

	@DeleteMapping(value="/user/delete/{id}")
	ResponseEntity<Void> deleteUser(@PathVariable("id") Long id);
}