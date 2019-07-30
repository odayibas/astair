package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import tr.com.astair.astair.model.Survey;
import tr.com.astair.astair.repository.SurveyRepository;
import tr.com.astair.astair.service.SurveyService;

import java.util.List;

public class SurveyServiceImp implements SurveyService {
    private SurveyRepository surveyRepository;

    public Survey write(){
        Survey newSurvey = new Survey();
        return newSurvey;


    }
    public List<Survey> get(){

        try {
            return surveyRepository.get();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    @Override
    public int addSurvey(Survey survey) {

        return 0;
    }


}
