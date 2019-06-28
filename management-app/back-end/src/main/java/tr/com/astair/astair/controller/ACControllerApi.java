package tr.com.astair.astair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.AC;

import java.util.List;

public interface ACControllerApi {


    @PostMapping("/AC/save")
    ResponseEntity<AC> saveAC(@RequestBody AC ac);

    @PutMapping("/AC/update")
    public ResponseEntity<AC> updateAC(@RequestBody AC ac);

    @DeleteMapping("/AC/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable AC ac);


    //get current AC record by id
    @GetMapping("/AC/get/{id}")
    public ResponseEntity<AC> getAC(@PathVariable Long id);

    //get all ACs data
    @GetMapping("/AC/get-all")
    public ResponseEntity<List<AC>> getAllAC();

/*
    @GetMapping("/AC/get-last/{id}")
    ResponseEntity<List<AC>> getLimited(@PathVariable Long id);*/

}
