package tr.com.astair.astair.service;

import tr.com.astair.astair.model.WebVote;
import tr.com.astair.astair.model.WeatherPollResult;

import java.util.List;

public interface WebVoteService {
    //get all Slack data
    List<WebVote> get();

    //get last web data
    List<WebVote> getWebLastResult();

    //get last poll results as hot,cold,good
    WeatherPollResult getWebResults();

    //get last poll results as hot,cold,good by zone
    WeatherPollResult getWebResultsByZone(Integer zone);

    //add new result to table
    WebVote   addResult (WebVote webVote);

    //get results by user id
    List<WebVote> getResultbyUserId(Long user_id);

}
