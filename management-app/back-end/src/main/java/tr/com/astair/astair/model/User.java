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
	@Column(name="role", nullable = false)
	private Integer role;

	@NotNull
    @Size(min=1, message="Password should have at least 1 characters")
	@Column(name="user_password")
	private String password;

	@ManyToMany(fetch = FetchType.EAGER)

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
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