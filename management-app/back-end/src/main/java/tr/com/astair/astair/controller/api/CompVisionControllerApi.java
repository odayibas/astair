package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import tr.com.astair.astair.model.ComputerVision;

import java.util.List;

public interface CompVisionControllerApi {
    //get today's average people count
    @GetMapping("/get-average-people-count")
    ResponseEntity<Integer> getAvePeopleCnt();

    //get today's average female count
    @GetMapping("/get-average-female-count")
    ResponseEntity<Integer> getAveFemaleCnt();

    //get today's average male count
    @GetMapping("/get-average-male-count")
    ResponseEntity<Integer> getAveMaleCnt();

    //get all data
    @GetMapping("/get-all")
    ResponseEntity<List<ComputerVision>> getAll();

    //get today's all data
    @GetMapping("/get-today")
    ResponseEntity<List<ComputerVision>> getTodaysData();

    //get last 30 records
    @GetMapping("/get-limited")
    ResponseEntity<List<ComputerVision>> getLimited();

    //get current people count
    @GetMapping("/get-people")
    ResponseEntity<ComputerVision> getPeopleCount();

    //get current female count
    @GetMapping("/get-female")
    ResponseEntity<ComputerVision> getFemaleCount();

    //get current male count
    @GetMapping("/get-male")
    ResponseEntity<ComputerVision> getMaleCount();
}