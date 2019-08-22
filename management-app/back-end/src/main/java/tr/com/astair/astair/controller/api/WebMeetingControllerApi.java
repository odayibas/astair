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

    @PostMapping("/meeting/set-meeting/{username}/{date}/{time}/{room}")
    ResponseEntity<List<WebMeeting>> setMeeting(@PathVariable String username, @PathVariable String date, @PathVariable String time, @PathVariable String room);

    @GetMapping("/meeting/get-meeting-a-range/{beginDate}/{finishDate}")
    ResponseEntity<List<WebMeeting>> getMeetingARange(@PathVariable String beginDate, @PathVariable String finishDate);

    @GetMapping("/meeting/get-meeting-a-range/{beginDate}/{finishDate}/{room}")
    ResponseEntity<List<WebMeeting>> getMeetingARange(@PathVariable String beginDate, @PathVariable String finishDate, @PathVariable String room );

    @GetMapping("/meeting/get-last-meeting")
    ResponseEntity<List<WebMeeting>> getLastMeeting();

}
