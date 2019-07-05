package tr.com.astair.astair.model;

public class WeatherPollResult {

    /*Sometimes, we’re only interested in a subset or a custom view of an entity’s attributes.
     For such cases, we can make use of projections.We can also include new data calculated from our resource attributes.
     This class to return weather poll results */


    private Integer Hot;
    private Integer Cold;
    private Integer Nice;

    public WeatherPollResult() {
    }

    public Integer getHot() {
        return Hot;
    }

    public void setHot(Integer hot) {
        Hot = hot;
    }

    public Integer getCold() {
        return Cold;
    }

    public void setCold(Integer cold) {
        Cold = cold;
    }

    public Integer getNice() {
        return Nice;
    }

    public void setNice(Integer nice) {
        Nice = nice;
    }
}
