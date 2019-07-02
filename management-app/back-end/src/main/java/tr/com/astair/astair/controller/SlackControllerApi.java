package tr.com.astair.astair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherP1;

import java.util.List;

public interface SlackControllerApi {

    //get poll result hot,cold,good
    @GetMapping("/slack/get-poll-result/{id}")
    public ResponseEntity<WeatherP1> getPollResults(@PathVariable Integer id);

    //get poll result
    @GetMapping("/slack/get-poll-all-result/{id}")
    public ResponseEntity<List<Slack>> getPollAllResult(@PathVariable Integer id);

    //get all data
    @GetMapping("/slack/get-all")
    public ResponseEntity<List<Slack>> getAll();

}
