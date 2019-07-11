package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.api.ACControllerApi;
import tr.com.astair.astair.model.AC;
import tr.com.astair.astair.service.ACService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ACController implements ACControllerApi {

    private ACService acService;

    @Autowired
    public ACController(ACService acService) {
        this.acService = acService;
    }

    public ResponseEntity<AC> saveAC(@RequestBody AC ac) {
        try {
            ac = acService.save(ac);
            return new ResponseEntity<>(ac, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<AC>> getLastACRecords() {
        List<AC> ac =  new ArrayList<>();
        for(int i=0;i<acService.getACCount();++i){
           ac.add(acService.getLast(i+1));
        }
        if (ac.isEmpty())
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(ac, HttpStatus.OK);
    }

    public ResponseEntity<List<AC>> getAllAC() {
        List<AC> ac = acService.get();
        if (ac == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ac, HttpStatus.OK);
    }

	@Override
	public ResponseEntity<List<AC>> getByZone(Integer id) {
		List<AC> test = acService.getByZone(id);
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Float> getACDegreeAvg(Integer id) {
		Float test = acService.getACDegreeAvg(id);
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Float>(test, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Float> getAllACDegreeAvg() {
		Float test = acService.getAllACDegreeAvg();
        if (test == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Float>(test, HttpStatus.OK);
	}
}

