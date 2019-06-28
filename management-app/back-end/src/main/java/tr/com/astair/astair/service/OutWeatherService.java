package tr.com.astair.astair.service;

import tr.com.astair.astair.model.OutdoorWeather;

import java.util.List;


public interface OutWeatherService {

    public OutdoorWeather save(OutdoorWeather oWeather);

    public OutdoorWeather get(Long id);

    public List<OutdoorWeather> get();


}
