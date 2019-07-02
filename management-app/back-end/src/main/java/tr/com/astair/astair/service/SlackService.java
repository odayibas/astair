package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherP1;

import java.util.List;

public interface SlackService {

    //get all Slack data
    public List<Slack> get();

    //get last polls result
    public List<Slack> getPollAllResults(Integer poll_id);

    //get poll results as hot,cold,good
    public WeatherP1 getPollResults(Integer poll_id);
}
