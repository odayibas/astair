package tr.com.astair.astair.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.CompVisionControllerApi;
import tr.com.astair.astair.model.ComputerVision;
import tr.com.astair.astair.service.ComputerVisionService;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@RestController
public class CompVisionController implements CompVisionControllerApi {

    private ComputerVisionService computerVisionService;

    @Autowired
    public CompVisionController(ComputerVisionService computerVisionService) {
        this.computerVisionService = computerVisionService;
    }

    public ResponseEntity<List<ComputerVision>> getCurrentDateData() {
        try {
      /*      SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date  date1 = format.parse ( date );*/
            List<ComputerVision> test = computerVisionService.getCurrentDateData();
            if (test == null) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(test, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
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
