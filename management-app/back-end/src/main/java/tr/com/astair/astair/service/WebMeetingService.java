package tr.com.astair.astair.service;
import tr.com.astair.astair.model.WebMeeting;
import java.util.List;
public interface WebMeetingService {
    List<WebMeeting> getTodaysMeeting(String date);

    List<WebMeeting> setMeeting(String username, String date, String time, String room);
    List<WebMeeting> getMeetingARange(String beginDate, String finishDate);
    List<WebMeeting> getMeetingARange(String beginDate, String finishDate, String room);
    List<WebMeeting> getLastMeeting();
}