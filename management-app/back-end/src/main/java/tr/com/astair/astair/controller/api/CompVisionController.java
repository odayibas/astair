package tr.com.astair.astair.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.CompVisionControllerApi;
import tr.com.astair.astair.model.ComputerVision;
import tr.com.astair.astair.service.ComputerVisionService;


import java.util.List;

@RestController
public class CompVisionController implements CompVisionControllerApi {

    private ComputerVisionService computerVisionService;

    @Autowired
    public CompVisionController(ComputerVisionService computerVisionService) {
        this.computerVisionService = computerVisionService;
    }

    public ResponseEntity<List<ComputerVision>> get(@PathVariable String id) {
        List<ComputerVision> test = computerVisionService.getIdforManage(id);
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<ComputerVision>> getAll() {
        List<ComputerVision> test = computerVisionService.get();
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<ComputerVision>> getLimited() {
        List<ComputerVision> test = computerVisionService.getLimited();
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<ComputerVision> getPeopleCount() {
        Integer test = computerVisionService.getPersonCount();
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }

    public ResponseEntity<ComputerVision> getFemaleCount() {
        Integer test = computerVisionService.getFemaleCount();
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }

    public ResponseEntity<ComputerVision> getMaleCount() {
        Integer test = computerVisionService.getMaleCount();
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }


}
