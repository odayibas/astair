import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import { connect } from 'react-redux'
import { getData } from '../../../../services/session/VoteChart/actions';

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
      this.props.onGetData().then(res => {
        this.setState({
          cold: res[0],
          hot: res[1],
          nice: res[2]
        });
        this.drawVoteChart(res);

      })
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

const mapStatetoProps = (state) => {
  return { data: state.data, error: state.error }
}

const mapDispatchprops = (dispatch) => {
  return {
    onGetData: () => dispatch(getData()),

  }
}

export default connect(mapStatetoProps, mapDispatchprops)(VoteChart);
