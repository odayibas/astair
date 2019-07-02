package tr.com.astair.astair.service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherP1;
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

    public WeatherP1 getPollResults(Integer poll_id) {
        WeatherP1 wp1 = new WeatherP1();
        wp1.setCold(slackRepository.getPollResults(poll_id, "Cold"));
        wp1.setHot(slackRepository.getPollResults(poll_id, "Hot"));
        wp1.setNice(slackRepository.getPollResults(poll_id, "Nice"));
        return wp1;
    }

    public List<Slack> getPollAllResults(Integer poll_id) {
        return slackRepository.getPollAllResults(poll_id);
    }

    public List<Slack> get() {
        return slackRepository.findAll();
    }

}
