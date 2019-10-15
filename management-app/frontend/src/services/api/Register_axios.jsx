onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      role: 2, //user role is 2
      password: this.state.password
    };

    return axios
      .post(urlServer + "/user/register/", {
        username: user.username,
        role: user.role,
        password: user.password
      })
      .then(res => {
        console.log(res.data);

        if (res) {
          if (res.data === -2 || res.data === -1) {
            alert("Invalid Credentials");
            return this.props.history.push("/register");
          } else {
            alert("Register Successful");
            return res.data && this.props.history.push("/login");
          }
        }
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };