package tr.com.astair.astair.model;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;


@Entity
@Table(name = "computervision")
public class ComputerVision implements Serializable {


    @Id
    @Column(name = "data_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.S")
    private Timestamp date;

    @Column(name = "action_type")
    private String action_type;

    @Column(name = "occupancy")
    private Integer occupancy;

    @Column(name = "male_count")
    private Integer male_count;

    @Column(name = "female_count")
    private Integer female_count;

    public ComputerVision() {
    }

    public ComputerVision(String action_type, Integer occupancy, Integer male_count, Integer female_count) {
        this.action_type = action_type;
        this.occupancy = occupancy;
        this.male_count = male_count;
        this.female_count = female_count;
    }

    public Timestamp getId() {
        return date;
    }

    public void setId(Timestamp id) {
        this.date = id;
    }

    public String getAction_type() {
        return action_type;
    }

    public void setAction_type(String action_type) {
        this.action_type = action_type;
    }

    public Integer getOccupancy() {
        return occupancy;
    }

    public void setOccupancy(Integer occupancy) {
        this.occupancy = occupancy;
    }

    public Integer getMale_count() {
        return male_count;
    }

    public void setMale_count(Integer male_count) {
        this.male_count = male_count;
    }

    public Integer getFemale_count() {
        return female_count;
    }

    public void setFemale_count(Integer female_count) {
        this.female_count = female_count;
    }
}
