package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
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
        try {
            return outdoorWeatherRepo.save(oWeather);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public OutdoorWeather get(Long id) {
        try {
            return outdoorWeatherRepo.getOne(id);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<OutdoorWeather> get() {
        try {
            return outdoorWeatherRepo.findAll();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public OutdoorWeather getlast() {
        try {
            return outdoorWeatherRepo.findFirstByOrderByIdDesc();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }
}
