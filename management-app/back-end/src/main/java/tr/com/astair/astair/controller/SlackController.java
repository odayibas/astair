package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.api.SlackControllerApi;
import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherPollResult;
import tr.com.astair.astair.service.SlackService;

import java.util.List;

@RestController
public class SlackController implements SlackControllerApi {

    private SlackService slackService;

    @Autowired
    public SlackController(SlackService slackService) {
        this.slackService = slackService;
    }

    public ResponseEntity<WeatherPollResult> getPollResults() {
        WeatherPollResult test = slackService.getPollResults();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<WeatherPollResult> getPollResultsByZone(@PathVariable Integer zone) {
        WeatherPollResult test = slackService.getPollResultsByZone(zone);
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<Slack>> getPollAllResult() {
        List<Slack> test = slackService.getPollAllResults();
        if (test == null) {
            return new ResponseEntity<>((List<Slack>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<Slack>> getAll() {
        List<Slack> test = slackService.get();
        if (test == null) {
            return new ResponseEntity<>((List<Slack>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

}
