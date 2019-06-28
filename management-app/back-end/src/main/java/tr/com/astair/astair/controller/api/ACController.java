package tr.com.astair.astair.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tr.com.astair.astair.controller.ACControllerApi;
import tr.com.astair.astair.model.AC;
import tr.com.astair.astair.service.ACService;

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


    public ResponseEntity<AC> getAC(@PathVariable Long id) {
        AC ac = acService.getById(id);
        if (ac == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ac, HttpStatus.OK);
    }


    public ResponseEntity<List<AC>> getAllAC() {
        List<AC> ac = acService.get();
        if (ac == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ac, HttpStatus.OK);
    }


    public ResponseEntity<AC> updateAC(@RequestBody AC ac) {
        if (ac.getId() == null || acService.getById(ac.getId()) == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        acService.update(ac);
        return new ResponseEntity<>(null, HttpStatus.OK);

    }

    public ResponseEntity<Void> deleteById(@PathVariable AC ac) {
        if (ac.getId() == null || acService.getById(ac.getId()) == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        acService.delete(ac);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

  /*  public ResponseEntity<List<AC>> getLimited(@PathVariable Long id){
        List<AC> test = acService.getLimited(id);
        if(test == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }*/

}
