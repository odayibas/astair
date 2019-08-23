package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tr.com.astair.astair.model.Rooms;
import java.util.List;

public interface RoomsControllerApi {
    @GetMapping("/rooms/get-all-rooms")
    ResponseEntity<List<Rooms>> getAllRooms();

}
