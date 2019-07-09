package tr.com.astair.astair.service;

import tr.com.astair.astair.model.AC;

import java.util.List;


public interface ACService {

    AC save(AC ac);

    void update(AC ac);

    void delete(AC ac);

    //get AC data by Id
    AC getById(Long id);

    //get all AC data
    List<AC> get();

    //get last record of given AC
    AC getLast(Integer ac_id) ;

    //get AC count
    Integer getACCount();
}
