package tr.com.astair.astair.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.models.auth.In;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "meeting_web")
public class WebMeeting {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;


    @Column(name = "username")
    private String username;


    @Column(name = "date")
    private String date;


    @Column(name = "room")
    private String room;


    @Column(name = "time")
    private String time;


    public WebMeeting() {
    }

    public WebMeeting(String username, String date, String room, String time) {
        this.setUsername(username);
        this.setDate(date);
        this.setRoom(room);
        this.setTime(time);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
