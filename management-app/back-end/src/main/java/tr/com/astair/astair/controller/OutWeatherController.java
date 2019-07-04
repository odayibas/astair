package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import tr.com.astair.astair.controller.api.OWControllerApi;
import tr.com.astair.astair.domain.Outdoor;
import tr.com.astair.astair.model.OutdoorWeather;
import tr.com.astair.astair.service.OutWeatherService;

import java.util.List;

@RestController
public class OutWeatherController implements OWControllerApi {

    @Autowired
    RestTemplate restTemplate;
    private OutWeatherService outWeatherService;

    @Autowired
    public OutWeatherController(OutWeatherService outWeatherService) {
        this.outWeatherService = outWeatherService;
    }

    public ResponseEntity<OutdoorWeather> saveOW() {
        try {
            String Url = "https://api.darksky.net/forecast/ad2e612b7b164a37c0e1c77b75544aa8/39.925533,32.866287?units=si";

            ResponseEntity<Outdoor> response = restTemplate.exchange(Url, HttpMethod.GET, null, new ParameterizedTypeReference<Outdoor>() {
            });
            Outdoor w = response.getBody();

            OutdoorWeather ow = new OutdoorWeather();
            ow.setApparent_temperature(w.currently.apparentTemperature);
            ow.setCloud_cover(w.currently.cloudCover);
            ow.setCurrently_summary(w.currently.summary);
            ow.setDew_point(w.currently.dewPoint);
            ow.setDaily_summary(w.daily.summary);
            ow.setHumidity(w.currently.humidity);
            ow.setPrecip_probability(w.currently.precipProbability);
            ow.setVisibility(w.currently.visibility);
            ow.setWind_speed(w.currently.windSpeed);
            ow.setTemperature(w.currently.temperature);
            ow.setTime_zone(w.timezone);
            ow = outWeatherService.save(ow);

            return new ResponseEntity<>(ow, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<OutdoorWeather>> getAllDB() {
        List<OutdoorWeather> owList = outWeatherService.get();
        if (owList == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(owList, HttpStatus.OK);
    }

    public ResponseEntity<OutdoorWeather> get() {
        OutdoorWeather ow = outWeatherService.getlast();
        if (ow == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(ow, HttpStatus.OK);
    }


}
