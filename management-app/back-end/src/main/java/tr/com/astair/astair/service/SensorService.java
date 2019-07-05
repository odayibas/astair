package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Sensor;


import java.util.List;


public interface SensorService {

    //get all sensor data
    public List<Sensor> get();

    //get all sensor data of a sensor
    public List<Sensor> getByZone(Integer id);

    //get last 30 records of a sensor
    public List<Sensor> getLimited(Integer id);

    // get average degree of a sensor
    public Float getSensorDegreeAve(Integer ac_id);

    // get average degree of all sensor
    public Float getAllSensorDegreeAve();

    // recently get degree of a sensor
    public List<Sensor> getSensorLastDegree();

}
