/*
package tr.com.astair.astair.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.controller.UserControllerApi;
import tr.com.astair.astair.model.User;
import tr.com.astair.astair.service.UserService;

@RestController
public class UserController implements UserControllerApi {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<User> save(@RequestBody User user) {
        try{
           user = userService.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<User> getByID(@PathVariable Long id){
        User user = userService.get(id);
        if(user == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }



    public ResponseEntity<User> update(@RequestBody User user){
        if(user.getId() ==null || userService.get(user.getId()) == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        userService.update(user);
        return  new ResponseEntity<>(null, HttpStatus.OK);

    }
}
*/


package tr.com.astair.astair.controller;

import tr.com.astair.astair.controller.api.UserControllerApi;
import tr.com.astair.astair.model.User;
import tr.com.astair.astair.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;


@RestController(value="/user")
public class UserController implements UserControllerApi {
	private UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
	    this.userService = userService;
	}
	
	public ResponseEntity<Long> registerUser(@RequestBody User user){
		Long id = userService.addUser(user);
		if(id == -1) {
			new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		String username=user.getUsername();
		String password= user.getPassword();
		return loginUser(username,password);
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

