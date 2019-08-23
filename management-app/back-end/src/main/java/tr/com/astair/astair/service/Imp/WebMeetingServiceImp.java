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

    public WebMeeting setMeeting(WebMeeting w){
        try {
            return webMeetingRepository.save(w);
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

    public List<WebMeeting> getLastMeeting() {
        try {
            return webMeetingRepository.getLastMeeting();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }
}