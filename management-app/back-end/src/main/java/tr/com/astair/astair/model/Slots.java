package tr.com.astair.astair.model;

import javax.persistence.*;

@Entity
@Table(name = "slots")
public class Slots {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "beginslot")
    private String beginSlot;

    @Column(name = "durationslot")
    private String durationSlot;

    @Column(name = "finishslot")
    private String finishSlot;

    public Slots(){

    }

    public Slots(String beginSlot, String durationSlot, String finishSlot){
        this.setBeginSlot(beginSlot);
        this.setDurationSlot(durationSlot);
        this.setFinishSlot(finishSlot);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

}
