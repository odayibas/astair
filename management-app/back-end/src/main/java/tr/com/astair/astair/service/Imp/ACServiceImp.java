package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.AC;
import tr.com.astair.astair.repository.ACRepository;
import tr.com.astair.astair.service.ACService;

import java.util.List;

@Service
public class ACServiceImp implements ACService {

    ACRepository acRepository;
    private static final Integer ENTRY_SIZE = 2000;

    @Autowired
    private ACServiceImp(ACRepository acRepository) {
        this.acRepository = acRepository;
    }

    public AC save(AC ac) {
        return acRepository.save(ac);
    }

    public List<AC> getByZone(Integer ac_zone) {
        try {
            Example<AC> acExample = Example.of(new AC(ac_zone, null, null, null,null,null));
            return acRepository.findAll(acExample);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<AC> get() {
        try {
            if(getACEntryCount() < ENTRY_SIZE){
                acRepository.deleteAll();
                return null;
            }
            List<AC> list = acRepository.findAll();
            return list;
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Long getACEntryCount(){return acRepository.getMaxAC_Id() - acRepository.getMinAC_Id() + 1;}

    public void update(AC ac) {
        acRepository.save(ac);
    }

    public void delete(AC ac) {
        acRepository.delete(ac);
    }

    public AC getLast(Integer ac_id) {
        return acRepository.getIdforManage(ac_id);
    }

    public Integer getACCount(){
        return acRepository.getACCount();
    }
    
    public Float getACDegreeAvg(Integer ac_id) {
        try {
            return acRepository.getACDegreeAvg(ac_id);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }
    
    public Float getAllACDegreeAvg() {
        try {
            return acRepository.getAllACDegreeAvg();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }
}
