package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.Rooms;

import java.util.List;

public interface RoomsControllerApi {
    @GetMapping("/rooms/get-all-rooms")
    ResponseEntity<List<Rooms>> getAllRooms();

    @PostMapping("/rooms/add-room")
    ResponseEntity<Rooms> addRoom(@RequestBody Rooms room);

    @PostMapping("/rooms/delete-room")
    void deleteRoom(@RequestBody Rooms room);

}
