package tr.com.astair.astair.service;

import tr.com.astair.astair.model.WebMeeting;

import java.util.List;

public interface WebMeetingService {

    List<WebMeeting> getTodaysMeeting(String date);
    List<WebMeeting> getLastMeeting();

}
