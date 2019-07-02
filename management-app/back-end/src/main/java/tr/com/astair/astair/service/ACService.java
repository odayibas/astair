package tr.com.astair.astair.service;

import tr.com.astair.astair.model.AC;

import java.util.List;


public interface ACService {

    public AC save(AC ac);

    public void update(AC ac);

    public void delete(AC ac);

    //get AC data by Id
    public AC getById(Long id);

    //get all AC data
    public List<AC> get();

}
