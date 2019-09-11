package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.AC;

import java.util.List;

public interface ACControllerApi {

    //get current AC record by id
    @GetMapping("/AC/get-last-records")
    ResponseEntity<List<AC>> getLastACRecords();

    //get all ACs data
    @GetMapping("/AC/get-all")
    ResponseEntity<List<AC>> getAllAC();
    
    // get all data of an AC by zone
    @GetMapping("/AC/get-zone/{id}")
    ResponseEntity<List<AC>> getByZone(@PathVariable Integer id);
    
    //get last 30 records average degree of a sensor
    @GetMapping("/AC/get-avg-degree/{id}")
    ResponseEntity<Float> getACDegreeAvg(@PathVariable Integer id);

    //get last 30 records average degree of all sensor
    @GetMapping("/AC/get-avg-degree")
    ResponseEntity<Float> getAllACDegreeAvg();

}
