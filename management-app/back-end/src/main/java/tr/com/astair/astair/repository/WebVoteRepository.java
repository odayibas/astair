package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.WebVote;

import java.util.List;

public interface WebVoteRepository extends JpaRepository<WebVote, Long> {

    @Query(nativeQuery = true, value = "select * from web_vote p where p.vote_id= (select MAX(vote_id) from web_vote w)")
    List<WebVote> getWebLastResult();

    @Query(nativeQuery = true, value = "select count(vote) from web_vote p where p.vote_id=(select MAX(w.vote_id) from web_vote w) and p.vote= :temp ")
    Integer getWebResults(@Param("temp") String temp);

    @Query(nativeQuery = true, value = "select count(vote) from web_vote p where p.vote_id = (select MAX(w.vote_id) from web_vote w) and p.vote= :temp  and p.region=:region ")
    Integer getWebResultsByZone(@Param("temp") String temp, @Param("region") Integer region);

    @Query(nativeQuery = true, value = "select * from web_vote w where w.user_id = :user_id  order by w.id desc LIMIT 10")
    List<WebVote> getResultbyUserId(@Param("user_id") Long user_id);


}