package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherPollResult;

import java.util.List;

public interface SlackControllerApi { //post larin hepsi get ti

    //get poll result hot,cold,good
    @PostMapping("/slack/get-poll-result-hot-cold-nice")
    ResponseEntity<WeatherPollResult> getPollResults();

    //get poll result hot,cold,good by zone
    @PostMapping("/slack/get-poll-result-by-zone-hot-cold-nice/{zone}")
    ResponseEntity<WeatherPollResult> getPollResultsByZone(@PathVariable Integer zone);

    //get poll result
    @PostMapping("/slack/get-poll-all-result")
    ResponseEntity<List<Slack>> getPollAllResult();

    //get all data
    @PostMapping("/slack/get-all-data")
    ResponseEntity<List<Slack>> getAll();

}
