package tr.com.astair.astair.service;

import tr.com.astair.astair.model.WebMeeting;
import java.util.List;

public interface WebMeetingService {
    List<WebMeeting> getTodaysMeeting(String date);
    WebMeeting setMeeting(WebMeeting w);
    List<WebMeeting> getMeetingARange(String beginDate, String finishDate);
    List<WebMeeting> getMeetingARange(String beginDate, String finishDate, String room);
    List<String> findSpareRoom(String date, String startTime, String endTime);
    List<WebMeeting> findHowMuchSpare(String date, String time, String room);
    List<WebMeeting> getLastMeeting();
}