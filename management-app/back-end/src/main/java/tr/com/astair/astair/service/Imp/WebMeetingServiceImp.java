package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.WebMeeting;
import tr.com.astair.astair.repository.WebMeetingRepository;
import tr.com.astair.astair.service.WebMeetingService;

import java.util.List;

@Service
public class WebMeetingServiceImp implements WebMeetingService {
    private WebMeetingRepository webMeetingRepository ;
    @Autowired
    public WebMeetingServiceImp(WebMeetingRepository webMeetingRepository)
    {
        this.webMeetingRepository = webMeetingRepository;
    }
    public List<WebMeeting> getTodaysMeeting(String date) {
        try {
            return webMeetingRepository.getTodaysMeeting(date);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public void setMeeting(WebMeeting w){
        try {
            webMeetingRepository.save(w);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<WebMeeting> getMeetingARange(String beginDate, String finishDate) {
        try {
            return webMeetingRepository.getMeetingARange(beginDate, finishDate);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<WebMeeting> getMeetingARange(String beginDate, String finishDate, String room) {
        try {
            return webMeetingRepository.getMeetingARange(beginDate, finishDate, room);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<String> findSpareRoom(String date, String startTime, String endTime) {
        try {
            return webMeetingRepository.findSpareRoom(date, startTime, endTime);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Integer findHowMuchSpare(String date, String time, String room) {
        try {
            return webMeetingRepository.findHowMuchSpare(date, time, room);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<String> fullDays(Integer month) {
        try {
            return webMeetingRepository.fullDays(month);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<String> appropriateRooms(String date, String time) {
        try {
            return webMeetingRepository.appropriateRooms(date, time);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<WebMeeting> getLastMeeting() {
        try {
            return webMeetingRepository.getLastMeeting();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public void removeAllMeeting() {
        try {
            webMeetingRepository.deleteAll();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

}