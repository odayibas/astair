
  postData = async () => {
    var x = {
      date_time: saveDate(),
      user_id: getCookie("token"),
      vote_id: vote_id,
      vote: this.state.vote,
      region: this.state.region
    };
    this.props.getVoteResult(x);
    axios
      .post(urlServer + "/vote/save-vote", x)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };