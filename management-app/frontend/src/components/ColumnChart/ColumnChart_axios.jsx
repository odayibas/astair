  getcompVisionControllerData = async () => {
    return axios
      .get(urlServer + "/get-all")
      .then(res => {
        var people = res.data[res.data.length - 1].occupancy;

        this.setPeople(people);
        const numberOfPeople = res.data.map(p => p.occupancy);

        this.setState({ people: numberOfPeople });
        columnChartOptions.series[0].data = this.state.people;
        console.log('people:', numberOfPeople)
        //this.drawPeopleChart(res);
        //console.log('columnChartOptions:',columnChartOptions)


      })
      .catch(error => {
        console.log(error);
      });
  };

    getSensorData = async () => {
    await Promise.all(
      urlArr.map(url =>
        axios(urlServer + "/sensor/get-zone/" + url).then(res => {
          this.props.sensorTemp[url] =
            res.data[res.data.length - 1].sensor_degree;
          this.props.sensorHum[url] =
            res.data[res.data.length - 1].sensor_humidity;
          const degrees = res.data.map(p => p.sensor_degree);
          this.setState({ sensorData: degrees });
          console.log('sensordata:', degrees);
          //console.log(res)
          columnChartOptions.series[1].data = this.state.sensorData;

        })
      )
    );
  };





  getSensorAverageData = () => {
    return axios.get(urlServer + "/sensor/get-ave-degree").then(res => {
      this.props.setAvgTemp(res.data);
      //this.drawTempChart(res);    

      //console.log(res);     // average degree

      //  this.drawOutdoorChart()
    });
  };