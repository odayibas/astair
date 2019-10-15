  getData = async () => {
    return axios
      .get(urlServer + "/vote/get-web-result-hot-cold-nice")
      .then(res => {
        this.setState({
          cold: res.data.cold,
          hot: res.data.hot,
          nice: res.data.nice
        });

        this.drawVoteChart(res);
      })
      .catch(err => {
        console.log(err);
      });
  };