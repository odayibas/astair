package tr.com.astair.astair.service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.Slack;
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

    public List<Slack> getPollResult(Integer poll_id){
       return slackRepository.getPollResult(poll_id);
    }

    public List<Slack> get() {
        return slackRepository.findAll();
    }

}
