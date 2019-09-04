package tr.com.astair.astair.service;

import tr.com.astair.astair.model.WebMeeting;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface WebMeetingService {
    List<WebMeeting> getTodaysMeeting(String date);
    void setMeeting(WebMeeting w);
    List<WebMeeting> getMeetingARange(String beginDate, String finishDate);
    List<WebMeeting> getMeetingARange(String beginDate, String finishDate, String room);
    List<String> findSpareRoom(String date, String startTime, String endTime);
    Integer findHowMuchSpare(String date, String time, String room);
    List<String> appropriateDays(Integer Month);
    List<String> appropriateRooms(String date, String time);
    List<WebMeeting> getLastMeeting();
    void removeAllMeeting();
}