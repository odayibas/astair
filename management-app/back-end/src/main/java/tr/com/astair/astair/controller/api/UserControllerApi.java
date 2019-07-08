/*
package tr.com.astair.astair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.User;

public interface UserControllerApi {
    @PostMapping("/user/save")
    public ResponseEntity<User> save(@RequestBody User user);

    @GetMapping("/user/get/{id}")
    public ResponseEntity<User> getByID(@PathVariable Long id);

    @PutMapping("/user/update")
    public ResponseEntity<User> update(@RequestBody User user);
}
*/

package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.User;

public interface UserControllerApi{
	@PostMapping(value="/user/register")
	ResponseEntity<Long> registerUser(@RequestBody User user);
	
	@GetMapping(value="/user/{id}")
	ResponseEntity<User> getUserByIdToUsername(@PathVariable("id") Long id);
	
	@GetMapping(value="/user/login/{username}/{password}")
    ResponseEntity<Long> loginUser(@PathVariable("username") String username, @PathVariable("password") String password);
	
	@PutMapping(value="/user/update")
	ResponseEntity<User> updateUser(@RequestBody User user);
	
	@DeleteMapping(value="/user/delete/{id}")
	ResponseEntity<Void> deleteUser(@PathVariable("id") Long id);
}
