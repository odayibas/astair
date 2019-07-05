package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherPollResult;
import tr.com.astair.astair.repository.SlackRepository;
import tr.com.astair.astair.service.SlackService;

import java.util.List;

@Service
public class SlackServiceImp implements SlackService {

    private SlackRepository slackRepository;

    @Autowired
    public SlackServiceImp(SlackRepository slackRepository) {
        this.slackRepository = slackRepository;
    }

    public WeatherPollResult getPollResults() {
        try {
            WeatherPollResult wp1 = new WeatherPollResult();
            wp1.setCold(slackRepository.getPollResults("Soguk"));
            wp1.setHot(slackRepository.getPollResults("Sicak"));
            wp1.setNice(slackRepository.getPollResults("Guzel"));
            return wp1;
        } catch (
                QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public WeatherPollResult getPollResultsByZone(Integer zone) {
        try {
            WeatherPollResult wp1 = new WeatherPollResult();
            wp1.setCold(slackRepository.getPollResultsByZone("Soguk", zone));
            wp1.setHot(slackRepository.getPollResultsByZone("Sicak", zone));
            wp1.setNice(slackRepository.getPollResultsByZone("Guzel", zone));
            return wp1;
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<Slack> getPollAllResults() {
        try {
            return slackRepository.getPollAllResults();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<Slack> get() {
        try {
            return slackRepository.findAll();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

}
