package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Rooms;
import java.util.List;

public interface RoomsService {
    List<Rooms> getAllRooms();
    Rooms addRoom(Rooms room);
    void deleteRoom(Rooms r);
    Integer findId(String room);
}
