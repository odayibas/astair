package tr.com.astair.astair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tr.com.astair.astair.model.WebMeeting;

import java.util.List;

public interface WebMeetingRepository extends JpaRepository<WebMeeting, Long> {
    @Query(nativeQuery = true, value = "select * from meeting_web m where m.date = :date")
    List<WebMeeting> getTodaysMeeting(@Param("date") String date);

    @Query(nativeQuery = true, value = "select * from meeting_web m where m.date >= :beginDate and m.date <= :finishDate")
    List<WebMeeting> getMeetingARange(@Param("beginDate") String beginDate, @Param("finishDate") String finishDate);

    @Query(nativeQuery = true, value = "select * from meeting_web m where m.room = :room and m.date >= :beginDate and m.date <= :finishDate")
    List<WebMeeting> getMeetingARange(@Param("beginDate") String beginDate, @Param("finishDate") String finishDate, @Param("room") String room);

    @Query(nativeQuery = true, value = "select r.room " +
            "from rooms r " +
            "except " +
            "select distinct(m.room) " +
            "from meeting_web m " +
            "where (" +
                "(m.startTime <= :startTime and m.endTime > :startTime) " +
                "or (m.startTime < :endTime and m.endTime >= :endTime) " +
                "or (m.startTime >= :startTime and m.endTime <= :endTime)" +
            ") and m.date = :date"
    )
    List<String> findSpareRoom(@Param("date") String date, @Param("startTime") String startTime, @Param("endTime") String endTime);

    @Query(nativeQuery = true, value = "select (cast(substring(m.startTime, 1, 2) as int) - cast(substring(:time, 1, 2) as int)) * :interval " +
            "from meeting_web m " +
            "where m.date = :date " +
                "and m.room = :room " +
                "and m.startTime > :time " +
            "order by m.startTime " +
            "limit 1 "
    )
    Integer findHowMuchSpare(@Param("date") String date, @Param("time") String time, @Param("room") String room, @Param("interval") double interval);

    @Query(nativeQuery = true, value = "select TO_DATE(m.date, 'YYYY-MM-DD') " +
            "from meeting_web m " +
            "where cast (substring(m.date, 6, 2) as int) = :month " +
            "and TO_DATE(m.date, 'YYYY-MM-DD') >= current_date " +
            "group by m.date " +
            "having sum(cast(substring(m.endTime, 1, 2) as int) - cast(substring(m.startTime, 1, 2) as int)) = " +
            "(select count(*) from rooms) * :interval "
    )
    List<String> fullDays(@Param("month") Integer month,  @Param("interval") Double interval);

    @Query(nativeQuery = true, value = "select r.room " +
            "from rooms r " +
            "except " +
            "select m.room " +
            "from meeting_web m " +
            "where m.date = :date and ((m.startTime <= :time and m.endTime > :time) " +
            "or (m.startTime < :time and m.endTime > :time))"
    )
    List<String> appropriateRooms(@Param("date") String date, @Param("time") String time);

    @Query(nativeQuery = true, value = "select * from meeting_web")
    List<WebMeeting> getLastMeeting();

    @Query(nativeQuery = true, value = "select cast(concat( " +
            "substring(a.durationSlot, 1, 2), " +
            "'.', " +
            "cast((cast(substring(a.durationSlot, 4, 2) as int)*5/3) as varchar) " +
            ") as double precision) " +
            "from admin a " +
            "order by a.id desc " +
            "limit 1 ")
    Double findInterval();

//    @Query(nativeQuery = true, value = "select count(vote) from web_vote p where p.vote_id=(select MAX(w.vote_id) from web_vote w) and p.vote= :temp ")
//    Integer getWebResults(@Param("temp") String temp);
//
//    @Query(nativeQuery = true, value = "select count(vote) from web_vote p where p.vote_id = (select MAX(w.vote_id) from web_vote w) and p.vote= :temp  and p.region=:region ")
//    Integer getWebResultsByZone(@Param("temp") String temp, @Param("region") Integer region);
//
//    @Query(nativeQuery = true, value = "select * from web_vote w where w.user_id = :user_id  order by w.id desc LIMIT 10")
//    List<WebVote> getResultbyUserId(@Param("user_id") Long user_id);
}