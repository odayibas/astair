getData = async () => {
    const url =
      "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/eda3e07c6d1ebeb49dd8a4353a0666a9/39.925533,32.866287?units=si";
    return axios
      .get(url, {
        headers: {
          "Access-Control-Allow-Origin": true
        }
      })
      .then(res => {
        let presentState = { ...this.state };
        presentState.temp = res.data.currently.apparentTemperature;
        presentState.currentWeather = res.data.currently.summary;
        presentState.dailySummary = res.data.hourly.summary;
        presentState.dew = res.data.currently.dewPoint;
        presentState.humidity = res.data.currently.humidity;
        presentState.visibility = res.data.currently.visibility;
        presentState.timezone = res.data.timezone;

        this.setState({
          ...presentState
        });
      });
  };