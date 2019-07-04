package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import tr.com.astair.astair.domain.Outdoor;


@RestController
@RequestMapping("/outdoor")
public class DarkSkyController {

    @Autowired
    RestTemplate restTemplate;

    @GetMapping
    public Outdoor getOutdoor() {
        String Url = "https://api.darksky.net/forecast/ad2e612b7b164a37c0e1c77b75544aa8/39.925533,32.866287?units=si";

        ResponseEntity<Outdoor> response = restTemplate.exchange(Url, HttpMethod.GET, null, new ParameterizedTypeReference<Outdoor>() {
        });
        Outdoor w = response.getBody();
        return w;
    }

}
