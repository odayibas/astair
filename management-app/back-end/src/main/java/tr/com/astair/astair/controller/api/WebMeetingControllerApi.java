package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.WebMeeting;

import java.time.LocalDate;
import java.util.Date;
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

    @GetMapping("/meeting/find-spare-room/{date}/{startTime}/{endTime}")
    ResponseEntity<List<String>> findSpareRoom(@PathVariable String date, @PathVariable String startTime, @PathVariable String endTime);

    @GetMapping("/meeting/find-how-much-spare/{date}/{time}/{room}")
    ResponseEntity<Integer> findHowMuchSpare(@PathVariable String date, @PathVariable String time, @PathVariable String room);

    @GetMapping("/meeting/appropriate-rooms/{date}/{time}")
    ResponseEntity<List<String>> appropriateRooms(@PathVariable String date, @PathVariable String time);

    @GetMapping("/meeting/appropriate-days/{month}")
    ResponseEntity<List<String>> appropriateDays(@PathVariable Integer month);

    @GetMapping("/meeting/get-last-meeting")
    ResponseEntity<List<WebMeeting>> getLastMeeting();

    @GetMapping("/meeting/remove-all-meeting")
    void removeAllMeeting();
}