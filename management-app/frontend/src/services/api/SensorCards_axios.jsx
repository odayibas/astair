
  getacData = async () => {
    var ac = [];

    await Promise.all(
      urlArr.map(url =>
        axios(urlServer + "/AC/get-zone/" + url).then(res => {
          ac[parseInt(url) - 1] = {
            ac_id: res.data[res.data.length - 1].ac_id,
            ac_degree: res.data[res.data.length - 1].ac_degree,
            ac_mode: res.data[res.data.length - 1].ac_mode,
            ac_fan_speed: res.data[res.data.length - 1].ac_fan_speed,
            active: res.data[res.data.length - 1].active
          };
        })
      )
    );

    this.props.setAC(ac);
  };