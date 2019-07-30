package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.Slack;

import java.util.List;

public interface SlackRepository extends JpaRepository<Slack, Long> {

    @Query(nativeQuery = true, value = "select * from weatherpoll p where p.vote_id= (select MAX(vote_id) from weatherpoll w)")
    List<Slack> getPollAllResults();

    @Query(nativeQuery = true, value = "select count(vote)from weatherpoll p where p.vote_id=(select MAX(vote_id) from weatherpoll w) and p.vote= cast(:temp as vote_type ) ")
    Integer getPollResults(@Param("temp") String temp);

    @Query(nativeQuery = true, value = "select count(vote)from weatherpoll p join personalinfo i on p.user_id=i.id where p.vote_id = (select MAX(vote_id) from weatherpoll w) and p.vote= cast(:temp as vote_type) and i.ac_id=:acZone ")
    Integer getPollResultsByZone(@Param("temp") String temp, @Param("acZone") Integer acZone);



}
