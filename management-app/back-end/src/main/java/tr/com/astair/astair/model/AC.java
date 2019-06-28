package tr.com.astair.astair.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "ac")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AC implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "ac_mode")
    private String ac_mode;

    @Column(name = "ac_degree")
    private Float ac_degree;

    @Column(name = "ac_fan_speed")
    private String ac_fan_speed;

    @Column(name = "active")
    private String active;

    @Column(name = "ac_time")
    private String ac_time;

    public AC() {

    }

    public AC(String ac_mode, Float ac_degree, String ac_fan_speed, String active, String ac_time) {
        this.ac_mode = ac_mode;
        this.ac_degree = ac_degree;
        this.ac_fan_speed = ac_fan_speed;
        this.active = active;
        this.ac_time = ac_time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAc_mode() {
        return ac_mode;
    }

    public void setAc_mode(String ac_mode) {
        this.ac_mode = ac_mode;
    }

    public Float getAc_degree() {
        return ac_degree;
    }

    public void setAc_degree(Float ac_degree) {
        this.ac_degree = ac_degree;
    }

    public String getAc_fan_speed() {
        return ac_fan_speed;
    }

    public void setAc_fan_speed(String ac_fan_speed) {
        this.ac_fan_speed = ac_fan_speed;
    }

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getAc_time() {
        return ac_time;
    }

    public void setAc_time(String ac_time) {
        this.ac_time = ac_time;
    }
}
