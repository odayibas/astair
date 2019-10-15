getACAverage = async () => {
    return axios.get(urlServer + "/AC/get-avg-degree").then(res => {
      this.setState({ avgac: res.data });
    });
  };

  getSensorAstylesrageData = () => {
    return axios.get(urlServer + "/sensor/get-ave-degree").then(res => {
      this.sstylesAvgTemp(res.data);
      //thisstylesrawTempChart(res);    

      //consstylese.log(res);     // average degree

      //  thstyles.drawOutdoorChart()
    });
  };


  getSensorData = async () => {
    await Promise.all(
      urlArr.map(url =>
        axios(urlServer + "/sensor/get-zone/" + url).then(res => {
          this.state.sensorTemp[url] =
            res.data[res.data.length - 1].sensor_degree;
          this.state.sensorHum[url] =
            res.data[res.data.length - 1].sensor_humidity;
          const degrees = res.data.map(p => p.sensor_degree);
          this.setState({ sensorData: degrees });
          //console.log('sensordata:', degrees);
          //console.log(res)
          //columnChartOptions.series[1].data = this.state.sensorData;

        })
      )
    );
  };




  getOutdoorData = async () => {
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
        this.setState({
          ...presentState
        });
      });
  };
