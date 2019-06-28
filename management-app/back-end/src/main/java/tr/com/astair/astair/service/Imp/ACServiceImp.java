package tr.com.astair.astair.service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.AC;
import tr.com.astair.astair.repository.ACRepository;
import tr.com.astair.astair.service.ACService;

import java.util.List;

@Service
public class ACServiceImp implements ACService {

    ACRepository acRepository;

    @Autowired
    private ACServiceImp(ACRepository acRepository) {
        this.acRepository = acRepository;
    }

    public AC save(AC ac) {
        return acRepository.save(ac);
    }

    public AC getById(Long id) {
        return acRepository.getOne(id);
    }

    public List<AC> get() {
        return acRepository.findAll();
    }

    public void update(AC ac) {
        acRepository.save(ac);
    }

    public void delete(AC ac) {
        acRepository.delete(ac);
    }

    public List<AC> getLimited(Long id) {
        return acRepository.getIdforManage(id);
    }

}
