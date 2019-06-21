import React, { Component} from 'react';
import {  Redirect} from 'react-router-dom';


class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state= {
      redirectToReferrer : false,
    }


  }
  componentWillMount(){
    if(sessionStorage.getItem("userData")){
      console.log("call user feed")
    }
    else{
      this.setState({redirectToReferrer : true});
  }
}

  render() {

    return (
      <div className="animated fadeIn">
      <div> Dashboard </div>
        
      </div>
    );
  }
}

export default Dashboard;
