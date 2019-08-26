package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.WebMeeting;
import java.util.List;

public interface WebMeetingControllerApi {
    @GetMapping("/meeting/get-todays-meeting/{date}")
    ResponseEntity<List<WebMeeting>> getTodaysMeeting(@PathVariable String date);

    @PostMapping("/meeting/set-meeting")
    ResponseEntity<WebMeeting> setMeeting(@RequestBody WebMeeting w);

    @GetMapping("/meeting/get-meeting-a-range/{beginDate}/{finishDate}")
    ResponseEntity<List<WebMeeting>> getMeetingARange(@PathVariable String beginDate, @PathVariable String finishDate);

    @GetMapping("/meeting/get-meeting-a-range/{beginDate}/{finishDate}/{room}")
    ResponseEntity<List<WebMeeting>> getMeetingARange(@PathVariable String beginDate, @PathVariable String finishDate, @PathVariable String room );

    @GetMapping("/meeting/get-last-meeting")
    ResponseEntity<List<WebMeeting>> getLastMeeting();

}