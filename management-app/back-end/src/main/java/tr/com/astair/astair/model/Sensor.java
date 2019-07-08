package tr.com.astair.astair.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
//import java.io.Serializable;

@Entity
@Table(name = "sensor")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "ac_id")
    private Integer ac_id;

    @Column(name = "sensor_degree")
    private Float sensor_degree;

    @Column(name = "date_time")
    private String date_time;

    public Sensor() {

    }

    public Sensor(Integer ac_id, String date_time, Float sensor_degree) {
        this.ac_id = ac_id;
        this.date_time = date_time;
        this.sensor_degree = sensor_degree;
    }

    /*
	public Sensor(Integer ac_id) {
        this.ac_id = ac_id;
    }
	
    public Sensor(String date_time) {
        this.date_time = date_time;
    }

    public Sensor(Integer ac_id, Float sensor_degree) {
        this.ac_id = ac_id;
        this.sensor_degree = sensor_degree;
    }
    */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getSensor_degree() {
        return sensor_degree;
    }

    public void setSensor_degree(Float sensor_degree) {
        this.sensor_degree = sensor_degree;
    }

    public String getDate_time() {
        return date_time;
    }

    public void setDate_time(String date_time) {
        this.date_time = date_time;
    }

    public Integer getAc_id() {
        return ac_id;
    }

    public void setAc_id(Integer ac_id) {
        this.ac_id = ac_id;
    }
}
