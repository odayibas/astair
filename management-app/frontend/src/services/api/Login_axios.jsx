onSubmit = e => {
    const { history } = this.props;
    e.preventDefault();

    const user = {
      username: this.state.username,
      role: 1,
      password: this.state.password
    };

    axios
      .post(urlServer + "/user/login/" + user.username + "/" + user.password, {
        username: user.username,
        role: user.role,
        password: user.password
      })
      .then(res => {
        if (res) {
          if (res.data !== -2 && res.data !== -1) {
            var promise1 = Promise.resolve(res.data);
            promise1.then(function(value) {
              axios.post(urlServer + "/user/" + value).then(res => {
                setCookie("usertoken", res.data.role);
                setCookie("token", res.data.id);

                return history.push("/dashboard");
              });
            });
          } else {
            alert("Invalid Credentials");
            return history.push("/login");
          }
          return res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };