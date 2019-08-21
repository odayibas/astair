package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.api.WebMeetingControllerApi;
import tr.com.astair.astair.model.WebMeeting;
import tr.com.astair.astair.service.WebMeetingService;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class WebMeetingController implements WebMeetingControllerApi {

    private WebMeetingService webMeetingService;

    @Autowired
    public WebMeetingController(WebMeetingService webMeetingService) {
        this.webMeetingService = webMeetingService;
    }


    public ResponseEntity<List<WebMeeting>> getTodaysMeeting(@PathVariable String date) {
        List<WebMeeting> test = webMeetingService.getTodaysMeeting(date);
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<List<WebMeeting>> getLastMeeting() {
        List<WebMeeting> test = webMeetingService.getLastMeeting();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

}
