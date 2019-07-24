package tr.com.astair.astair.service;

import tr.com.astair.astair.model.ComputerVision;


import java.util.List;

public interface ComputerVisionService {

    //get average people count of today
    Integer getAvePeopleCnt();

    //get average female count of today
    Integer getAveFemaleCnt();

    //get average male count of today
    Integer getAveMaleCnt();

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
