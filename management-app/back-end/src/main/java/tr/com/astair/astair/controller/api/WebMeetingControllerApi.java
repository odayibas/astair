package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.support.WebBindingInitializer;
import tr.com.astair.astair.model.WebMeeting;

import java.util.List;

public interface WebMeetingControllerApi {

    @GetMapping("/meeting/get-todays-meeting/{date}")
    ResponseEntity<List<WebMeeting>> getTodaysMeeting(@PathVariable String date);

    @GetMapping("/meeting/get-last-meeting")
    ResponseEntity<List<WebMeeting>> getLastMeeting();

}
