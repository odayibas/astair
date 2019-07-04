package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import tr.com.astair.astair.model.OutdoorWeather;

import java.util.List;


public interface OWControllerApi {

    @GetMapping("/OutWeather/get-all-outdoor-data")
    ResponseEntity<List<OutdoorWeather>> getAllDB();

    @GetMapping("/OutWeather/get-last-outdoor-data")
    ResponseEntity<OutdoorWeather> get();

    @GetMapping("/OutWeather/save-outdoor-data")
    ResponseEntity<OutdoorWeather> saveOW();
}
