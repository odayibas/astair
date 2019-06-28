package tr.com.astair.astair.service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.Sensor;
import tr.com.astair.astair.repository.SensorRepository;
import tr.com.astair.astair.service.SensorService;


import java.util.List;

@Service
public class SensorServiceImp implements SensorService {

    SensorRepository sensorRepository;

    @Autowired
    public SensorServiceImp(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<Sensor> get() {
        return sensorRepository.findAll();
    }

    public List<Sensor> getByZone(Integer ac_zone) {
        Example<Sensor> sExample = Example.of(new Sensor(ac_zone));
        ;
        return sensorRepository.findAll(sExample);
    }

    public List<Sensor> getLimited(Integer ac_id) {
        return sensorRepository.getIdforManage(ac_id);
    }

    public Float getSensorDegreeAve(Integer ac_id) {
        return sensorRepository.getSensorDegreeAve(ac_id);
    }

    public Float getAllSensorDegreeAve() {
        return sensorRepository.getAllSensorDegreeAve();
    }

}
