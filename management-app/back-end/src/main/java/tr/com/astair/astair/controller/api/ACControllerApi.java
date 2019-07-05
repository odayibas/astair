package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.AC;

import java.util.List;

public interface ACControllerApi {


    //get current AC record by id
    @GetMapping("/AC/get-last-records")
    public ResponseEntity<List<AC>>  getLastACRecords();

    //get all ACs data
    @GetMapping("/AC/get-all")
    public ResponseEntity<List<AC>> getAllAC();


}
