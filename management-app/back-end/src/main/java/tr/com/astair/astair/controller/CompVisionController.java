package tr.com.astair.astair.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.api.CompVisionControllerApi;
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


    public ResponseEntity<Integer> getAvePeopleCnt() {
        Integer test = computerVisionService.getAvePeopleCnt();
        if (test == null) {
            return new ResponseEntity<>((Integer) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }

    public ResponseEntity<Integer> getAveFemaleCnt() {
        Integer test = computerVisionService.getAveFemaleCnt();
        if (test == null) {
            return new ResponseEntity<>((Integer) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }

    public ResponseEntity<Integer> getAveMaleCnt() {
        Integer test = computerVisionService.getAveMaleCnt();
        if (test == null) {
            return new ResponseEntity<>((Integer) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }

    public ResponseEntity<List<ComputerVision>> getAll() {
        List<ComputerVision> test = computerVisionService.get();
        if (test == null) {
            return new ResponseEntity<>((List<ComputerVision>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<ComputerVision>> getTodaysData() {
        List<ComputerVision> test = computerVisionService.getTodaysData();
        if (test == null) {
            return new ResponseEntity<>((List<ComputerVision>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<ComputerVision>> getLimited() {
        List<ComputerVision> test = computerVisionService.getLimited();
        if (test == null) {
            return new ResponseEntity<>((List<ComputerVision>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<ComputerVision> getPeopleCount() {
        Integer test = computerVisionService.getPersonCount();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }

    public ResponseEntity<ComputerVision> getFemaleCount() {
        Integer test = computerVisionService.getFemaleCount();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }

    public ResponseEntity<ComputerVision> getMaleCount() {
        Integer test = computerVisionService.getMaleCount();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(test, HttpStatus.OK);
    }

}
