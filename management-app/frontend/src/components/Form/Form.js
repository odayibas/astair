
import React, { Component } from 'react'
import { Button, Card, CardBody} from 'reactstrap'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import axios from 'axios'
import {get as getCookie} from 'es-cookie';
import {Col, Row} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import 'react-vertical-timeline-component/style.min.css';
import {Link} from 'react-router-dom'

import VoteChart from './VoteChart'
import Timeline from './Timeline'



const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 
const baseYear = new Date(Date.UTC(2019, 0, 0, 0, 0, 0));
const duration = 1;

var vote_id, time,today, hour ;


function diff_minutes(dt2, dt1) 
 {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
 }

function takeVoteId(){
        let now = new Date();
        vote_id = Math.floor( diff_minutes(now, baseYear)/duration);
        return vote_id;
}

function saveDate(){
  today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  
  var h = today.getHours();
  var m = today.getMinutes();
  hour = h + ":" + m ;

  today = dd + '/' + mm + '/' + yyyy;
  return (today +"  "+hour);

}

class SlackForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        vote : "Hot",
        vote_id : null,
        region: 1,
        interval : null,
          results : [
              {
                user_id: "",
                vote : "",
                vote_id : "",
                region: "",
                date_time : "",
              }
            ],
    };
  
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    onChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }


    handleSubmit(event) {
      
      if(this.state.vote === "" || this.state.region === ""){
        console.log("Invalid choice please choose a valid option ")

      }
      else{
        var vote = takeVoteId();
        this.setState((prevState, props) => ({ vote_id: vote })); 
        this.setState({ state: this.state }); 

    /*   var now = new Date();
      now.setMilliseconds(now.getMilliseconds() + time);
      setCookie('timetoken',  getCookie('token'), { expires: now })        
      this.setState({ state: this.state });  */

        this.postData();
      }
      event.preventDefault();
    }

    getData =  async() => {
      
      return axios.get( urlServer + "/vote/get-by-user_id/" + getCookie('token'))
      .then(res =>{ 
        if(res.data.length !== 0 && res.data){

        this.setState((prevState, props) => (
          { 
            vote_id : res.data[0].vote_id,
            results : res.data
          }));

          var minutes = (res.data[0].vote_id * duration);
          var now = new Date();
          var nowMin =  diff_minutes(now, baseYear);
          time = nowMin -minutes;
        }
    })
    .catch(err =>{
      console.log(err)
    })
      
    }


    postData =  async() => {
     axios.post( urlServer + "/vote/save-vote", {
        date_time : saveDate(),
        user_id : getCookie('token'),
        vote_id : vote_id,
        vote : this.state.vote,
        region : this.state.region,

      })
    .then(res =>{

      if(res)
       this.getData();

    }).catch(err =>{
      console.log(err)        
    })
      
    }


    refresh() {
      setTimeout(() => {
        this.forceUpdate();
      },(time*60*1000));
     console.log(time);
     }

  componentDidUpdate(){
    setTimeout(() => {
      this.forceUpdate();
    },(time*60*1000));
   console.log(time);
   }

  componentDidMount(){
    takeVoteId();
    this.getData();
    this.setState((prevState, props) => (
      { 
        time : time 
      }));
  }



getForm(){
  return (
    
      <Card>
        <CardBody>
            <Form >
              <FormGroup  >
                <FormLabel>Weather</FormLabel>
                <h5> How is the weather condition, how do you feel?</h5>
                  <FormControl id="vote" value={this.state.vote} onChange={this.onChange} as="select">                     
                    <option value="Hot">Hot</option>
                    <option value="Nice">Nice</option>
                    <option value="Cold">Cold</option>
                  </FormControl>
              </FormGroup>
              <FormGroup  >
                <FormLabel> Region</FormLabel>
                 <h5>What is your location in the office?</h5>
                  <FormControl id="region"  value={this.state.region} onChange={this.onChange} as="select">
                    <option value={1}>Region 1</option>
                    <option value={2}>Region 2</option>
                    <option value={3}>Region 3</option>
                    <option value={4}>Region 4</option>
                  </FormControl>
              </FormGroup>
          </Form>
          <Button type = "submit" value ="Submit" onClick = {this.handleSubmit}>Submit
          </Button>
        </CardBody>
      </Card>  
    );


}
    render() {
      // if( getCookie('usertoken') !== getCookie('token')){
    if(getCookie('usertoken') === "1" || getCookie('usertoken') === "2"){     
     if( this.state.vote_id !== vote_id){
          return (
            <div style={{width: '100% !important',margin: 'auto',height: '100%',marginTop: '40px'}}>
            <div style={{left:'10px', right:'10px', display : 'flex' , padding : '30px', width : '100%', height: '90%'}}>               
                
                <Col  xs="5" sm="6">
                <div>
                  <h2>VOTE TIMELINE</h2> 
                </div>
                <div>
                  <Timeline results = {this.state.results}/>
                </div>
                </Col>
                <Col xs="5" sm="3">
                <Row> 
                  <div style={{paddingLeft:'25%'}}>
                  <Card>
                  <CardBody>
                  <center>
                    <div className="text-value"> 
                      <h4> You are in region  </h4>
                      <h2> {this.state.results[0].region} </h2>
                      <Link to=""> Click here to find your region </Link>
                    </div>
                </center>
                </CardBody>
                  </Card>
                  </div>
                </Row>  
                <Row style = {{padding :  '10%'}}>
                  <div >
                  <h3>GIVE YOUR VOTE</h3>
                {this.getForm()}
                </div>
                </Row>
              </Col>
              <Col xs="5" sm="3">
                <Row style = {{paddingLeft :  '10%'}} > 
                <VoteChart time = {this.state.time}/>
                </Row>
              </Col>
            </div>
          </div> 
        
            )}
            else {
            return  (
            <div style={{width: '100% !important',margin: 'auto',height: '100%',marginTop: '40px'}}>
              <div style={{left:'10px', right:'10px', display : 'flex' , padding : '30px', width : '100%', height: '90%'}}> 

              <Col xs="5" sm="7"><div><h2>VOTE TIMELINE</h2> </div><div><Timeline results = {this.state.results}/></div></Col>
              <Col  xs="5" sm="5">
              <Row style ={{paddingBottom : '10%'}}> 
                  <div >
                  <Card >
                  <CardBody>
                  <center>
                    <div className="text-value"> 
                      <h4> You are in region  </h4>
                      <h2> {this.state.results[0].region} </h2>
                    </div>
                </center>
                </CardBody>
                  </Card>
                  </div>
                </Row>  
                <Row> 
                <VoteChart time = {this.state.time}/>
                </Row>

                </Col>
              </div> 
            </div>)
            }
          }
          else{
            return <Redirect to='/login'/>;
          }
    }
  }
  
 export default SlackForm
