package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Sensor;


import java.util.List;


public interface SensorService {

    //get all sensor data
    List<Sensor> get();

    //get all sensor data of a sensor
    List<Sensor> getByZone(Integer id);

    //get last 30 records of a sensor
    List<Sensor> getLimited(Integer id);

    // get average degree of a sensor
    Float getSensorDegreeAve(Integer ac_id);

    // get average degree of all sensor
    Float getAllSensorDegreeAve();

    // recently get degree of a sensor
    List<Sensor> getSensorLastDegree();
    
    // get average humidity of a sensor
    Float getSensorHumidityAvg(Integer ac_id);
    
    // get average humidity of all sensor
    Float getAllSensorsAvgHumidity();

}
