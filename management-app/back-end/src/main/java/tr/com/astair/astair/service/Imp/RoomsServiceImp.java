package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.Rooms;
import tr.com.astair.astair.repository.RoomsRepository;
import tr.com.astair.astair.service.RoomsService;
import java.util.List;

@Service
public class RoomsServiceImp implements RoomsService {
    private RoomsRepository roomsRepository ;
    @Autowired
    public RoomsServiceImp(RoomsRepository roomsRepository)
    {
        this.roomsRepository = roomsRepository;
    }
    public List<Rooms> getAllRooms() {
        try {
            return roomsRepository.getAllRooms();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Rooms addRoom(Rooms room){
        try {
            return roomsRepository.save(room);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Rooms deleteRoom(String room){
        try {
            return roomsRepository.deleteRoom(room);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

}
