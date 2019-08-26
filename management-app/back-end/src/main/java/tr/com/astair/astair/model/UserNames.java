package tr.com.astair.astair.model;

import javax.persistence.*;

@Entity
@Table(name = "usernames")
public class UserNames {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "username")
    private String username;

    public UserNames() {
    }

    public UserNames(String username) {
        this.setUsername(username);
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

}
