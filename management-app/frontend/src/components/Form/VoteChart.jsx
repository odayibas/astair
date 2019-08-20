import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

import axios from "axios";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

const brandPrimary = getStyle("--primary");
const brandDanger = getStyle("--danger");
const brandSuccess = getStyle("--success");

let voteChart = {
  labels: ["Cold", "Nice", "Hot"],
  responsive: true,
  datasets: [
    {
      label: "Slack",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      backgroundColor: [brandPrimary, brandSuccess, brandDanger],
      hoverBackgroundColor: [brandPrimary, brandSuccess, brandDanger],
      hoverBorderColor: "rgba(255,99,132,1)",
      data: []
    }
  ]
};

const voteChartOpts = {
  animation: false,
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend: {
    labels: {
      fontSize: 25,
      boxWidth: 25
    }
  },
  maintainAspectRatio: false
};

class VoteChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      cold: null,
      hot: null,
      nice: null
    };
  }

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

  drawVoteChart(res) {
    voteChart.datasets[0].data = [];
    voteChart.datasets[0].data.push(this.state.cold);
    voteChart.datasets[0].data.push(this.state.nice);
    voteChart.datasets[0].data.push(this.state.hot);
  }

  componentDidMount() {
    this.trigger();
  }

  trigger() {
    const interval = setInterval(() => {
      this.getData().then(data => {});
    }, 1500);

    this.setState(prevState => ({
      ...prevState,
      interval
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  showMessage = () => {
    if (this.props.show === true)
      return (
        <center>
          <h4>All user's feedback for current survey</h4>
        </center>
      );
    else
      return (
        <center>
          <h4>All user's feedback for previous survey</h4>
        </center>
      );
  };
  render() {
    return (
      <div className="chart-wrapper" style={{ height: "300px" }}>
        {this.showMessage()}
        <Doughnut
          data={voteChart}
          height={300}
          options={voteChartOpts}
          redraw
        />
      </div>
    );
  }
}

export default VoteChart;
