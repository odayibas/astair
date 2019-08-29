package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.Rooms;
import java.util.List;

public interface RoomsRepository extends JpaRepository<Rooms, Long> {
    @Query(nativeQuery = true, value = "select * from rooms")
    List<Rooms> getAllRooms();

    @Query(nativeQuery = true, value = "delete from rooms r where r.room = :room")
    Rooms deleteRoom(@Param("room") String room);

}
