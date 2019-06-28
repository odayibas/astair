package tr.com.astair.astair.service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.OutdoorWeather;
import tr.com.astair.astair.repository.OutWeatherRepo;
import tr.com.astair.astair.service.OutWeatherService;


import java.util.List;

@Service
public class OutWeatherServiceImp implements OutWeatherService {

    OutWeatherRepo outdoorWeatherRepo;

    @Autowired
    public OutWeatherServiceImp(OutWeatherRepo outdoorWeatherRepo) {
        this.outdoorWeatherRepo = outdoorWeatherRepo;
    }


    public OutdoorWeather save(OutdoorWeather oWeather) {
        return outdoorWeatherRepo.save(oWeather);
    }


    public OutdoorWeather get(Long id) {
        return outdoorWeatherRepo.getOne(id);
    }

    public List<OutdoorWeather> get() {
        return outdoorWeatherRepo.findAll();
    }


}
