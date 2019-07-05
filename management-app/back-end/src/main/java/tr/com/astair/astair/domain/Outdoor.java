package tr.com.astair.astair.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties
public class Outdoor {

    /*To be able to turn json to data from api we need these classes*/

    public CurrentData currently;
    public DailyData daily;
    public String timezone;

    public Outdoor() {
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public CurrentData getCurrently() {
        return currently;
    }

    public void setCurrently(CurrentData currently) {
        this.currently = currently;
    }

    public DailyData getDaily() {
        return daily;
    }

    public void setDaily(DailyData daily) {
        this.daily = daily;
    }
}
