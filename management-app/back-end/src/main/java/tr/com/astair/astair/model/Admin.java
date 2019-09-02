package tr.com.astair.astair.model;

import javax.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "beginslot")
    private String beginSlot;

    @Column(name = "durationslot")
    private String durationSlot;

    @Column(name = "finishslot")
    private String finishSlot;

    @Column(name = "surveyInterval")
    private String surveyInterval;

    public Admin() {
    }

    public Admin(String username, String beginSlot, String durationSlot, String finishSlot, String surveyInterval) {
        this.setUsername(username);
        this.setBeginSlot(beginSlot);
        this.setDurationSlot(durationSlot);
        this.setFinishSlot(finishSlot);
        this.setSurveyInterval(surveyInterval);
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

    public String getBeginSlot() {
        return beginSlot;
    }

    public void setBeginSlot(String beginSlot) {
        this.beginSlot = beginSlot;
    }

    public String getDurationSlot() {
        return durationSlot;
    }

    public void setDurationSlot(String durationSlot) {
        this.durationSlot = durationSlot;
    }

    public String getFinishSlot() {
        return finishSlot;
    }

    public void setFinishSlot(String finishSlot) {
        this.finishSlot = finishSlot;
    }

    public String getSurveyInterval() {
        return surveyInterval;
    }

    public void setSurveyInterval(String surveyInterval) {
        this.surveyInterval = surveyInterval;
    }

}
