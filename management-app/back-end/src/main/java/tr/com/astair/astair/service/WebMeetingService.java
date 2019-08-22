package tr.com.astair.astair.service;
import tr.com.astair.astair.model.WebMeeting;
import java.util.List;
public interface WebMeetingService {
    List<WebMeeting> getTodaysMeeting(String date);
<<<<<<< HEAD
=======
    List<WebMeeting> setMeeting(String username, String date, String time, String room);
>>>>>>> 5d3e9c928706d41a44f6f07ecb6dfbcaf518d263
    List<WebMeeting> getMeetingARange(String beginDate, String finishDate);
    List<WebMeeting> getMeetingARange(String beginDate, String finishDate, String room);
    List<WebMeeting> getLastMeeting();
}