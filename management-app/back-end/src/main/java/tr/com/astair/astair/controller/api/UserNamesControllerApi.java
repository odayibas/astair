package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.UserNames;
import java.util.List;

public interface UserNamesControllerApi {
    @GetMapping("/user-names/get-names")
    ResponseEntity<List<UserNames>> getNames();

    @PostMapping("/user-names/add-user-name")
    void addUserName(@RequestBody UserNames userNames);
}
