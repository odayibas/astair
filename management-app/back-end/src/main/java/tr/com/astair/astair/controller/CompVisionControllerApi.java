package tr.com.astair.astair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tr.com.astair.astair.model.ComputerVision;

import java.sql.Timestamp;
import java.util.List;

public interface CompVisionControllerApi {


    @GetMapping("/get/{date}")
    public ResponseEntity<List<ComputerVision>> get(@PathVariable String date);

    //get all data
    @GetMapping("/get-all")
    public ResponseEntity<List<ComputerVision>> getAll();

    //get last 30 records
    @GetMapping("/get-limited")
    public ResponseEntity<List<ComputerVision>> getLimited();

    //get current people count
    @GetMapping("/get-people")
    public ResponseEntity<ComputerVision> getPeopleCount();

    //get current female count
    @GetMapping("/get-female")
    public ResponseEntity<ComputerVision> getFemaleCount();

    //get current male count
    @GetMapping("/get-male")
    public ResponseEntity<ComputerVision> getMaleCount();


}
