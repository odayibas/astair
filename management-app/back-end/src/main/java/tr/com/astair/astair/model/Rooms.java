package tr.com.astair.astair.model;

import javax.persistence.*;

@Entity
@Table(name = "rooms")
public class Rooms {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Integer id;

    @Column(name = "room", nullable = false)
    private String room;

    public Rooms(){
    }

    public Rooms(String room){
        this.room = room;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

}