package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.WeatherPollResult;
import tr.com.astair.astair.model.WebVote;
import tr.com.astair.astair.repository.WebVoteRepository;
import tr.com.astair.astair.service.WebVoteService;

import java.util.List;

@Service
public class WebVoteServiceImp implements WebVoteService {

    private WebVoteRepository webVoteRepository ;

    @Autowired
        public WebVoteServiceImp(WebVoteRepository webVoteRepository)
    {
        this.webVoteRepository = webVoteRepository;
    }

    public WeatherPollResult getWebResults() {
        try {
            WeatherPollResult wp1 = new WeatherPollResult();
            wp1.setCold(webVoteRepository.getWebResults("Cold"));
            wp1.setHot(webVoteRepository.getWebResults("Hot"));
            wp1.setNice(webVoteRepository.getWebResults("Nice"));
            return wp1;
        } catch (
                QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public WeatherPollResult getWebResultsByZone(Integer zone) {
        try {
            WeatherPollResult wp1 = new WeatherPollResult();
            wp1.setCold(webVoteRepository.getWebResultsByZone("Cold",zone));
            wp1.setHot(webVoteRepository.getWebResultsByZone("Hot", zone));
            wp1.setNice(webVoteRepository.getWebResultsByZone("Nice", zone));
            return wp1;
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<WebVote> getWebLastResult() {
        try {
            return webVoteRepository.getWebLastResult();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<WebVote> get() {
        try {
            return webVoteRepository.findAll();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<WebVote> getResultbyUserId(Long user_id) {
        try {
            return webVoteRepository.getResultbyUserId(user_id);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }


    public WebVote addResult(WebVote webVote){
        return webVoteRepository.save(webVote);

    }

}
