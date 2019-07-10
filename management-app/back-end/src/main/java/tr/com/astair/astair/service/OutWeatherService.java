package tr.com.astair.astair.service;

import tr.com.astair.astair.model.OutdoorWeather;

import java.util.List;


public interface OutWeatherService {

    //save outdoor data to database
    OutdoorWeather save(OutdoorWeather oWeather);

    //get all outdoor data from database
    List<OutdoorWeather> get();

    //get last outdoor weather record
    OutdoorWeather getlast();


}
