package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.api.UserNamesControllerApi;
import tr.com.astair.astair.model.UserNames;
import tr.com.astair.astair.service.UserNamesService;
import java.util.List;

@RestController
public class UserNamesController implements UserNamesControllerApi {
    private UserNamesService userNamesService;
    @Autowired
    public UserNamesController(UserNamesService userNamesService) {
        this.userNamesService = userNamesService;
    }
    public ResponseEntity<List<UserNames>> getNames() {
        List<UserNames> test = userNamesService.getNames();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }
}
