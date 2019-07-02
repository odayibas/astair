package tr.com.astair.astair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import tr.com.astair.astair.model.ComputerVision;

import java.util.List;

public interface CompVisionControllerApi {

    //get today's average people count
    @GetMapping("/get-average-people-count")
    public ResponseEntity<Integer> getAvePeopleCnt();

    //get today's average female count
    @GetMapping("/get-average-female-count")
    public ResponseEntity<Integer> getAveFemaleCnt();

    //get today's average male count
    @GetMapping("/get-average-male-count")
    public ResponseEntity<Integer> getAveMaleCnt();

    //get all data
    @GetMapping("/get-all")
    public ResponseEntity<List<ComputerVision>> getAll();

    //get all data
    @GetMapping("/get-today")
    public ResponseEntity<List<ComputerVision>> getTodaysData();

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
