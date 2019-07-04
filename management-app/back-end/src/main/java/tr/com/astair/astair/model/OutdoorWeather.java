package tr.com.astair.astair.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "outdoor")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "ignoreUnknown = true"})
public class OutdoorWeather implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "temperature")
    @JsonProperty("temperature")
    private Float temperature;

    @Column(name = "apparent_temperature")
    @JsonProperty("apparentTemperature")
    private Float apparentTemperature;

    @Column(name = "currently_summary")
    @JsonProperty("summary")
    private String currently_summary;

    @Column(name = "daily_summary")
    @JsonProperty("")
    private String daily_summary;

    @Column(name = "dew_point")
    @JsonProperty("dewPoint")
    private Float dew_point;

    @Column(name = "humidity")
    @JsonProperty("humidity")
    private Float humidity;

    @Column(name = "visibility")
    @JsonProperty("visibility")
    private Float visibility;

    @Column(name = "cloud_cover")
    @JsonProperty("cloudCover")
    private Float cloud_cover;

    @Column(name = "wind_speed")
    @JsonProperty("windSpeed")
    private Float wind_speed;

    @Column(name = "precip_probability")
    @JsonProperty("precipProbability")
    private Float precip_probability;

    @Column(name = "time_zone")
    @JsonProperty("time")
    private String time;

    public OutdoorWeather() {

    }

    public OutdoorWeather(Float temperature, Float apparent_temperature, String currently_summary, String daily_summary, Float dew_point, Float humidity, Float visibility, Float cloud_cover, Float wind_speed, Float precip_probability, String time_zone) {
        this.temperature = temperature;
        this.apparentTemperature = apparent_temperature;
        this.currently_summary = currently_summary;
        this.daily_summary = daily_summary;
        this.dew_point = dew_point;
        this.humidity = humidity;
        this.visibility = visibility;
        this.cloud_cover = cloud_cover;
        this.wind_speed = wind_speed;
        this.precip_probability = precip_probability;
        this.time = time_zone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTemperature() {
        return temperature;
    }

    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }

    public Float getApparent_temperature() {
        return apparentTemperature;
    }

    public void setApparent_temperature(Float apparent_temperature) {
        this.apparentTemperature = apparent_temperature;
    }

    public String getCurrently_summary() {
        return currently_summary;
    }

    public void setCurrently_summary(String currently_summary) {
        this.currently_summary = currently_summary;
    }

    public String getDaily_summary() {
        return daily_summary;
    }

    public void setDaily_summary(String daily_summary) {
        this.daily_summary = daily_summary;
    }

    public Float getDew_point() {
        return dew_point;
    }

    public void setDew_point(Float dew_point) {
        this.dew_point = dew_point;
    }

    public Float getHumidity() {
        return humidity;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
    }

    public Float getVisibility() {
        return visibility;
    }

    public void setVisibility(Float visibility) {
        this.visibility = visibility;
    }

    public Float getCloud_cover() {
        return cloud_cover;
    }

    public void setCloud_cover(Float cloud_cover) {
        this.cloud_cover = cloud_cover;
    }

    public Float getWind_speed() {
        return wind_speed;
    }

    public void setWind_speed(Float wind_speed) {
        this.wind_speed = wind_speed;
    }

    public Float getPrecip_probability() {
        return precip_probability;
    }

    public void setPrecip_probability(Float precip_probability) {
        this.precip_probability = precip_probability;
    }

    public String getTime_zone() {
        return time;
    }

    public void setTime_zone(String time_zone) {
        this.time = time_zone;
    }
}
