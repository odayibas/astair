package tr.com.astair.astair.service;

import tr.com.astair.astair.model.ComputerVision;


import java.util.List;

public interface ComputerVisionService {

    //get average people count of today
    Integer getAvgPeopleCnt();

    //get average female count of today
    Integer getAvgFemaleCnt();

    //get average male count of today
    Integer getAvgMaleCnt();

    //get today's data
    List<ComputerVision> getTodaysData();


    //get all computer vision data
    List<ComputerVision> get();

    //get current person count
    Integer getPersonCount();

    //get current female count
    Integer getFemaleCount();

    //get current male count
    Integer getMaleCount();

    //get last 30 record of data
    List<ComputerVision> getLimited();

}
