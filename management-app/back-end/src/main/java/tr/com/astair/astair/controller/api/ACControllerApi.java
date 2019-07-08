package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.AC;

import java.util.List;

public interface ACControllerApi {


    //get current AC record by id
    @GetMapping("/AC/get-last-records")
    ResponseEntity<List<AC>>  getLastACRecords();

    //get all ACs data
    @GetMapping("/AC/get-all")
    ResponseEntity<List<AC>> getAllAC();


}
