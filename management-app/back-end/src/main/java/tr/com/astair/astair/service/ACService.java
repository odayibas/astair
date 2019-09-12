package tr.com.astair.astair.service;

import tr.com.astair.astair.model.AC;
import java.util.List;

public interface ACService {

    AC save(AC ac);
    void update(AC ac);
    void delete(AC ac);
    
    //get AC data by ac_id
    List<AC> getByZone(Integer ac_id);

    //get all AC data
    List<AC> get();

    //get last record of given AC
    AC getLast(Integer ac_id) ;

    //get AC count
    Integer getACCount();
    
    // get average degree of an AC
    Float getACDegreeAvg(Integer ac_id);

    // get average degree of all AC
    Float getAllACDegreeAvg();
}
