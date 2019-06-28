package tr.com.astair.astair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import tr.com.astair.astair.model.OutdoorWeather;

import java.util.List;


public interface OWControllerApi {

//    @PostMapping("/OutWeather/all-data")
//    public String getAPI();

    @PostMapping("/OutWeather/all-data")
    ResponseEntity<List<OutdoorWeather>> getAllOWApi();

    @GetMapping("/OutWeather/get-all-outdoor-data")
    ResponseEntity<List<OutdoorWeather>> getAllDB();

    @GetMapping("/OutWeather/get--outdoor-data")
    ResponseEntity<OutdoorWeather> getDB(@PathVariable Long id);


}
