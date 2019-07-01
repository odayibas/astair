package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Slack;

import java.util.List;

public interface SlackService {

    //get all Slack data
    public List<Slack> get();

    //get last polls result
    public List<Slack> getPollResult(Integer poll_id);
}
