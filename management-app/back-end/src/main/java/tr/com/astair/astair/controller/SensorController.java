package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.api.SensorControllerApi;
import tr.com.astair.astair.model.Sensor;
import tr.com.astair.astair.service.SensorService;

import java.util.List;

@RestController
public class SensorController implements SensorControllerApi {

    private SensorService sensorService;

    @Autowired
    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    public ResponseEntity<String> get() {
        return new ResponseEntity<>("Sensor", HttpStatus.OK);
    }

    public ResponseEntity<List<Sensor>> getByZone(@PathVariable Integer id) {
        List<Sensor> test = sensorService.getByZone(id);
        if (test == null) {
            return new ResponseEntity<>((List<Sensor>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<Sensor>> getAll() {
        List<Sensor> test = sensorService.get();
        if (test == null) {
            return new ResponseEntity<>((List<Sensor>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<Sensor>> getLimited(@PathVariable Integer id) {
        List<Sensor> test = sensorService.getLimited(id);
        if (test == null) {
            return new ResponseEntity<>((List<Sensor>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<Float> getSensorDegreeAve(@PathVariable Integer id) {
        Float test = sensorService.getSensorDegreeAve(id);
        if (test == null) {
            return new ResponseEntity<>((Float) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Float>(test, HttpStatus.OK);
    }

    public ResponseEntity<Float> getAllSensorDegreeAve() {
        Float test = sensorService.getAllSensorDegreeAve();
        if (test == null) {
            return new ResponseEntity<>((Float) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Float>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<Sensor>> getAllLastDegrees() {
        List<Sensor> sensorResults  = sensorService.getSensorLastDegree();
        if (sensorResults == null) {
            return new ResponseEntity<>((List<Sensor>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(sensorResults, HttpStatus.OK);
    }
    
    public ResponseEntity<Float> getSensorHumidityAvg(@PathVariable Integer id){
        Float test = sensorService.getSensorHumidityAvg(id);
        if (test == null) {
            return new ResponseEntity<>((Float) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Float>(test, HttpStatus.OK);
    }
    
    public ResponseEntity<Float> getAllSensorsAvgHumidity() {
        Float test = sensorService.getAllSensorsAvgHumidity();
        if (test == null) {
            return new ResponseEntity<>((Float) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Float>(test, HttpStatus.OK);
    }

}