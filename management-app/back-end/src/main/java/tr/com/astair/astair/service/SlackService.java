package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherPollResult;

import java.util.List;

public interface SlackService {

    //get all Slack data
    List<Slack> get();

    //get last poll data
    List<Slack> getPollAllResults();

    //get last poll results as hot,cold,good
    WeatherPollResult getPollResults();

    //get last poll results as hot,cold,good by zone
    WeatherPollResult getPollResultsByZone(Integer zone);

}
