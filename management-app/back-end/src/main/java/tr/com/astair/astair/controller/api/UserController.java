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
