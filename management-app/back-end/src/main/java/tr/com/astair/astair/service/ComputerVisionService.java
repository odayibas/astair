package tr.com.astair.astair.service;

import tr.com.astair.astair.model.ComputerVision;


import java.sql.Timestamp;
import java.util.List;

public interface ComputerVisionService {

    //get all data of a day like 2015-09-05%
    public List<ComputerVision> getIdforManage(String id);

    //get all computer vision data
    public List<ComputerVision> get();

    //get current person count
    public Integer getPersonCount();

    //get current female count
    public Integer getFemaleCount();

    //get current male count
    public Integer getMaleCount();

    /*  public List<Integer> getMaleCounts();*/
    //get last 30 record of data
    public List<ComputerVision> getLimited();

}
