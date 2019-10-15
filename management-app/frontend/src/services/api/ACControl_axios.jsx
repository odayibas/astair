//makes request to get last records for all airconditioners
getData = async () => {
    axios
      .get(urlServer + "/AC/get-last-records")
      .then(res => {
        let b = false;
        let active = "OFF";
        if (res.data[this.currentAC - 1].active === "1") {
          b = true;
          active = "ON";
        }
        const acData = {
          id: this.currentAC,
          mode: res.data[this.currentAC - 1].ac_mode,
          fan_speed: res.data[this.currentAC - 1].ac_fan_speed,
          temperature: res.data[this.currentAC - 1].ac_degree,
          active: active,
          isChecked: b
        };
        this.setState(acData, () => { });
      })
      .catch(err => {
        console.log(err);
      });
     setTimeout(this.getData, 20000); //To refresh data periodically.
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.id &&
      this.state.fan_speed &&
      this.state.temperature &&
      this.state.active &&
      this.state.mode
    ) {
      var message1 = (this.state.id + "").concat(
        "," +
        this.state.mode +
        "," +
        this.state.fan_speed +
        "," +
        this.state.temperature +
        "," +
        this.state.active
      );
      console.log("The message is ", message1);
      this.setState({
        message: message1
      });
      axios
        .post(urlServer + "/api/mqtt/publish", {
          message: message1,
          retained: false,
          topic: "Astair/MODEL/AC"
        })
        .then(res => {
          this.setState({ border: "border border-success" }, () => {
            setTimeout(() => {
              this.setState({ border: "" });
            }, 3000);
          });
          alert("Data Send");
        })
        .catch(error => {
          this.setState({ border: "border border-danger" }, () => {
            setTimeout(() => {
              this.setState({ border: "" });
            }, 3000);
          });
        });
    } else alert("Please fill all fields to proceed");
  };