package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.api.WebVoteControllerApi;
import tr.com.astair.astair.model.WebVote;
import tr.com.astair.astair.model.WeatherPollResult;
import tr.com.astair.astair.service.WebVoteService;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class WebVoteController implements WebVoteControllerApi {

    private WebVoteService webVoteService;

    @Autowired
    public WebVoteController(WebVoteService webVoteService) {
        this.webVoteService = webVoteService;
    }

    public ResponseEntity<WeatherPollResult> getWebResults() {
        WeatherPollResult test = webVoteService.getWebResults();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<WeatherPollResult> getWebResultsByZone(@PathVariable Integer zone) {
        WeatherPollResult test = webVoteService.getWebResultsByZone(zone);
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<WebVote>> getWebLastResult() {
        List<WebVote> test = webVoteService.getWebLastResult();
        if (test == null) {
            return new ResponseEntity<>((List<WebVote>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<WebVote>> getAll() {
        List<WebVote> test = webVoteService.get();
        if (test == null) {
            return new ResponseEntity<>((List<WebVote>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<WebVote>>  getResultbyUserId(@PathVariable Long user_id){
        List<WebVote> test = webVoteService.getResultbyUserId(user_id);
        if (test == null) {

            return new ResponseEntity<>((List<WebVote>) null, HttpStatus.BAD_REQUEST);
            }

        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public  ResponseEntity<WebVote> addResult(@RequestBody WebVote webVote) {
        WebVote test = new WebVote(webVote.getUser_id(),webVote.getVote(), webVote.getVote_id(),webVote.getRegion(), webVote.getDate_time());
        webVoteService.addResult(test);
        return new ResponseEntity<>(test, HttpStatus.OK);
    }
}
