package tr.com.astair.astair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import tr.com.astair.astair.controller.api.RoomsControllerApi;
import tr.com.astair.astair.model.Rooms;
import tr.com.astair.astair.service.RoomsService;
import java.util.List;

@RestController
public class RoomsController implements RoomsControllerApi{
    private RoomsService roomsService;
    @Autowired
    public RoomsController(RoomsService roomsService) {
        this.roomsService = roomsService;
    }
    public ResponseEntity<List<Rooms>> getAllRooms() {
        List<Rooms> test = roomsService.getAllRooms();
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<Rooms> addRoom(@RequestBody Rooms room) {
        Rooms test = new Rooms(room.getRoom());
        roomsService.addRoom(test);
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    public ResponseEntity<Rooms> deleteRoom(@RequestBody Rooms room) {
        Rooms test = roomsService.deleteRoom(room.getRoom());
        if (test == null) {
            return new ResponseEntity<>((MultiValueMap<String, String>) null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

}
