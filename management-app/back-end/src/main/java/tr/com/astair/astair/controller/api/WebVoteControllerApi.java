package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.support.WebBindingInitializer;
import tr.com.astair.astair.model.WebVote;
import tr.com.astair.astair.model.WeatherPollResult;

import java.util.List;

public interface WebVoteControllerApi {

    //get poll result hot,cold,good
    @GetMapping("/vote/get-web-result-hot-cold-nice")
    ResponseEntity<WeatherPollResult> getWebResults();

    //get poll result hot,cold,good by zone
    @GetMapping("/vote/get-web-result-by-zone-hot-cold-nice/{zone}")
    ResponseEntity<WeatherPollResult> getWebResultsByZone(@PathVariable Integer zone);

    //get poll result
    @GetMapping("/vote/get-web-last-result")
    ResponseEntity<List<WebVote>> getWebLastResult();

    //get all data
    @GetMapping("/vote/get-all-data")
    ResponseEntity<List<WebVote>> getAll();

    @GetMapping("/vote/get-by-user_id/{user_id}")
    ResponseEntity<List<WebVote>> getResultbyUserId(@PathVariable Long user_id);

    @PostMapping("/vote/save-vote")
    ResponseEntity<WebVote> addResult(@RequestBody WebVote webVote);

}
