package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Survey;

import java.util.List;

public interface SurveyService {

    //get all Slack data
    Survey write();
    //get all Slack data
    List<Survey> get();

    int addSurvey(Survey survey);

}
