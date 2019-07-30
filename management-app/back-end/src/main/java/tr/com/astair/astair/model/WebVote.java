package tr.com.astair.astair.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.models.auth.In;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "web_vote")
public class WebVote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id")
    private Long user_id;


    @Column(name = "vote")
    private String vote;


    @Column(name = "vote_id")
    private Long vote_id;



    @Column(name = "region")
    private Integer region;


    @Column(name = "date_time")
    private Long date_time;

    public WebVote() {
    }

    public WebVote(Long user_id) {
        this.user_id = user_id;
    }

    public WebVote(Long user_id, String vote, Long vote_id, Integer region) {
        this.user_id = user_id;
        this.vote = vote;
        this.vote_id = vote_id;
        this.region = region;

    }


    public Long getVote_id() {
        return vote_id;
    }

    public void setVote_id(Long vote_id) {
        this.vote_id = vote_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getVote() {
        return vote;
    }

    public void setVote(String vote) {
        this.vote = vote;
    }

    public Long getDate_time() {
        return date_time;
    }

    public void setDate_time(Long date_time) {
        this.date_time = date_time;
    }

    public Integer getRegion() {
        return region;
    }

    public void setRegion(Integer region) {
        this.region = region;
    }

}
