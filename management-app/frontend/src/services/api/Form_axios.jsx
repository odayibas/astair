getData = async () => {
    return axios
      .get(urlServer + "/vote/get-by-user_id/" + getCookie("token"))
      .then(res => {
        console.log(res.data);
        if (res.data.length !== 0 && res.data) {
          var now = new Date();
          var nowMin = this.diff_minutes(now, baseYear);
          time = (this.takeVoteId() + 1) * this.adminInterval - nowMin;
          console.log("Should have been done before");

          this.setState((prevState, props) => ({
            vote_id: res.data[0].vote_id,
            results: res.data
          }));

          if (vote_id && vote_id !== this.state.vote_id) {
            console.log("vote id", vote_id, "state vote", this.state.vote_id);
            setCookie("form_notification", "1");
            console.log("This one?");
            this.setState({
              show: true
            });
          } else {
            if (time === 0) this.refresh(true);
            else this.refresh(false);
          }
        } else {
          now = new Date();
          nowMin = this.diff_minutes(now, baseYear);
          time = (this.takeVoteId() + 1) * this.adminInterval - nowMin;

          this.setState({
            show: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };