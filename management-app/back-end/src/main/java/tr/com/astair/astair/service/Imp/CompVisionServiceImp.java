package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.ComputerVision;
import tr.com.astair.astair.repository.ComputerVisionRepo;
import tr.com.astair.astair.service.ComputerVisionService;

import java.util.List;

@Service
public class CompVisionServiceImp implements ComputerVisionService {

    private ComputerVisionRepo computerVisionRepo;

    @Autowired
    public CompVisionServiceImp(ComputerVisionRepo computerVisionRepo) {
        this.computerVisionRepo = computerVisionRepo;
    }


    public Integer getAvgPeopleCnt() {
        try {
            return computerVisionRepo.getAvgPeopleCount();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Integer getAvgFemaleCnt() {
        try {
            return computerVisionRepo.getAvgFemaleCount();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Integer getAvgMaleCnt() {
        try {
            return computerVisionRepo.getAvgMaleCount();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<ComputerVision> getTodaysData() {
        try {
            return computerVisionRepo.getTodaysData();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<ComputerVision> get() {
        try {
            return computerVisionRepo.findAll();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<ComputerVision> getLimited() {
        try {
            return computerVisionRepo.findTop30ByOrderByDateDesc();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Integer getPersonCount() {
        try {
            ComputerVision x = computerVisionRepo.findTopByOrderByDateDesc();
            return x.getOccupancy();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Integer getFemaleCount() {
        try {
            ComputerVision x = computerVisionRepo.findTopByOrderByDateDesc();
            return x.getFemale_count();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Integer getMaleCount() {
        try {
            ComputerVision x = computerVisionRepo.findTopByOrderByDateDesc();
            return x.getMale_count();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

}
