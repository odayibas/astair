/*
package tr.com.astair.astair.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "systemadmin")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name="user_name")
    private String user_name;

    @Column(name="user_password")
    private String user_password;

    public User(String user_name, String user_password) {
        this.user_name = user_name;
        this.user_password=user_password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }
}
*/
package tr.com.astair.astair.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "systemadmin")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
	@Id
	@NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
    private Long id;
	
	@NotNull
    @Size(min=1, message="Username should have at least 1 characters")
	@Column(name="username", nullable = false)
	private String username;
	
	@NotNull
    @Size(min=1, message="Password should have at least 1 characters")
	@Column(name="user_password")
	private String password;
	
	//@ManyToMany(fetch = FetchType.EAGER)
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
