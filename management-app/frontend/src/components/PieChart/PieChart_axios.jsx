  getSlackData = async () => {
    return axios
      .get(urlServer + "/slack/get-poll-result-hot-cold-nice")
      .then(res => {
        var cold = res.data.cold;
        var nice = res.data.nice;
        var hot = res.data.hot;

        console.log([cold,nice,hot]);    // poll results from slack

        this.setState({'slackResult':[cold,nice,hot]});
        pieChartOptions.series = this.state.slackResult;

      });
  };