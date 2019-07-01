package tr.com.astair.astair.service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.ComputerVision;
import tr.com.astair.astair.repository.ComputerVisionRepo;
import tr.com.astair.astair.service.ComputerVisionService;


import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class CompVisionServiceImp implements ComputerVisionService {

    private ComputerVisionRepo computerVisionRepo;

    @Autowired
    public CompVisionServiceImp(ComputerVisionRepo computerVisionRepo) {
        this.computerVisionRepo = computerVisionRepo;
    }


    public List<ComputerVision> getCurrentDateData( ) {
        return computerVisionRepo.getCurrentDateData();
    }

    public List<ComputerVision> get() {
        return computerVisionRepo.findAll();
    }

    public List<ComputerVision> getLimited() {
        return computerVisionRepo.findTop30ByOrderByDateDesc();
    }

    public Integer getPersonCount() {
        ComputerVision x = computerVisionRepo.findTopByOrderByDateDesc();
        return x.getOccupancy();
    }

    public Integer getFemaleCount() {
        ComputerVision x = computerVisionRepo.findTopByOrderByDateDesc();
        return x.getFemale_count();
    }

    public Integer getMaleCount() {
        ComputerVision x = computerVisionRepo.findTopByOrderByDateDesc();
        return x.getMale_count();
    }

}
