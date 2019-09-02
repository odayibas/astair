package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.api.AdminControllerApi;
import tr.com.astair.astair.model.Admin;
import tr.com.astair.astair.service.AdminService;

import java.util.List;

@RestController
public class AdminController implements AdminControllerApi {
    private AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    public ResponseEntity<List<Admin>> getSlots() {
        List<Admin> test = adminService.getSlots();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<Admin> setSlots(@PathVariable String beginSlot, String durationSlot, String finishSlot) {
        Admin test = new Admin("", beginSlot, durationSlot, finishSlot, "");
        adminService.setSlots(test);
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<Admin> setSlots(@RequestBody Admin a) {
        Admin test = new Admin(a.getUsername(), a.getBeginSlot(), a.getDurationSlot(), a.getFinishSlot(), a.getSurveyInterval());
        adminService.setSlots(test);
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

}
