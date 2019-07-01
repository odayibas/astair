/*
package tr.com.astair.astair.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tr.com.astair.astair.controller.OWControllerApi;
import tr.com.astair.astair.model.OutdoorWeather;
import tr.com.astair.astair.service.OutWeatherService;

import java.util.Arrays;
import java.util.List;

@RestController
public class OutWeatherController implements OWControllerApi {

    private OutWeatherService outWeatherService;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    public OutWeatherController(OutWeatherService outWeatherService) {
        this.outWeatherService = outWeatherService;
    }

    public String getAPI() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        return restTemplate.exchange("https://api.darksky.net/forecast/ad2e612b7b164a37c0e1c77b75544aa8/37.8267,-122.4233", HttpMethod.GET, entity, String.class).getBody();
    }

    public ResponseEntity<List<OutdoorWeather>> getAllOWApi() {

        String theUrl = "https://api.darksky.net/forecast/ad2e612b7b164a37c0e1c77b75544aa8/39.9334,32.8597?units=si";
        ResponseEntity<List<OutdoorWeather>> response = restTemplate.exchange(theUrl, HttpMethod.GET, null, new ParameterizedTypeReference<List<OutdoorWeather>>() {
        });
        List<OutdoorWeather> oWList = response.getBody();
        if (oWList == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(oWList, HttpStatus.OK);
    }

    public ResponseEntity<List<OutdoorWeather>> getAllDB() {
        List<OutdoorWeather> owList = outWeatherService.get();
        if (owList == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(owList, HttpStatus.OK);
    }

    public ResponseEntity<OutdoorWeather> getDB(@PathVariable Long id) {
        OutdoorWeather OW = outWeatherService.get(id);
        if (OW == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(OW, HttpStatus.OK);
    }
}
*/
