package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.Sensor;
import tr.com.astair.astair.repository.SensorRepository;
import tr.com.astair.astair.service.SensorService;

import java.util.ArrayList;
import java.util.List;

@Service
public class SensorServiceImp implements SensorService {

    SensorRepository sensorRepository;

    @Autowired
    public SensorServiceImp(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<Sensor> get() {
        try {
            return sensorRepository.findAll();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<Sensor> getByZone(Integer ac_zone) {
        try {
            Example<Sensor> sExample = Example.of(new Sensor(ac_zone));
            return sensorRepository.findAll(sExample);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<Sensor> getLimited(Integer ac_id) {
        try {
            return sensorRepository.getIdforManage(ac_id);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Float getSensorDegreeAve(Integer ac_id) {
        try {
            return sensorRepository.getSensorDegreeAve(ac_id);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public List<Sensor> getSensorLastDegree() {
        try {
            List<Sensor> s = new ArrayList<>();
            for (int i = 0; i < sensorRepository.getSensorCount(); ++i) {
                Sensor temp = new Sensor();
                temp.setSensor_degree(sensorRepository.getSensorLastDegree(i + 1));
                temp.setAc_id(i + 1);
                s.add(temp);
            }
            return s;

        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Float getAllSensorDegreeAve() {
        try {
            return sensorRepository.getAllSensorDegreeAve();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

}
