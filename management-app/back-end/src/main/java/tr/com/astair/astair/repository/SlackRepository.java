package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import tr.com.astair.astair.model.Slack;
import tr.com.astair.astair.model.WeatherP1;

import java.util.List;

public interface SlackRepository extends JpaRepository<Slack, Long> {

    @Query(nativeQuery = true, value = "select * from weatherpoll p where p.vote_id= :vote_id")
    List<Slack> getPollAllResults(@Param("vote_id") Integer vote_id);

    @Query(nativeQuery = true, value = "select count(vote)from weatherpoll p where p.vote_id= :vote_id and p.vote like ':temp' ")
    Integer getPollResults(@Param("vote_id") Integer vote_id, @Param("temp") String temp);

}
