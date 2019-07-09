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
        String Url = "https://api.darksky.net/forecast/f31a2aba5c564c041bff47dea985c048/39.908065,32.751893?units=si";

        ResponseEntity<Outdoor> response = restTemplate.exchange(Url, HttpMethod.GET, null, new ParameterizedTypeReference<Outdoor>() {
        });
        Outdoor w = response.getBody();
        return w;
    }

}
