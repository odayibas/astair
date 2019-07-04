package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherP1;

import java.util.List;

public interface SlackService {

    //get all Slack data
    public List<Slack> get();

    //get last poll data
    public List<Slack> getPollAllResults();

    //get last poll results as hot,cold,good
    public WeatherP1 getPollResults();

    //get last poll results as hot,cold,good by zone
    public WeatherP1 getPollResultsByZone(Integer zone);

}
