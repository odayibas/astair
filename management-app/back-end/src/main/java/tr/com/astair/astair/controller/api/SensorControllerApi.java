package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import tr.com.astair.astair.model.Sensor;


import java.util.List;


public interface SensorControllerApi {

    //get last 30 records of a sensor
    @GetMapping("/sensor/get-last/{id}")
    ResponseEntity<List<Sensor>> getLimited(@PathVariable Integer id);

    //get last 30 records average degree of a sensor
    @GetMapping("/sensor/get-ave-degree/{id}")
    ResponseEntity<Float> getSensorDegreeAve(@PathVariable Integer id);

    //get last 30 records average degree of all sensor
    @GetMapping("/sensor/get-ave-degree")
    ResponseEntity<Float> getAllSensorDegreeAve();

    //get all sensor data
    @GetMapping("/sensor/get-all")
    ResponseEntity<List<Sensor>> getAll();

    // get all data of a sensor
    @GetMapping("/sensor/get-zone/{id}")
    ResponseEntity<List<Sensor>> getByZone(@PathVariable Integer id);

    // get last degree data of all sensors
    @GetMapping("/sensor/last-data-of-all-sensors")
    ResponseEntity<List<Sensor>> getAllLastDegrees();
}
