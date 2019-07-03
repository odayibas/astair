package tr.com.astair.astair.service;

import tr.com.astair.astair.model.OutdoorWeather;

import java.util.List;


public interface OutWeatherService {

    //save outdoor data to database
    public OutdoorWeather save(OutdoorWeather oWeather);

    //get all outdoor data from database
    public List<OutdoorWeather> get();

    //get last outdoor weather record
    public OutdoorWeather getlast();


}
