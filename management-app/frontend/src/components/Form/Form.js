
import React, { Component } from 'react'
import { Badge, CardFooter,Button, Card, CardBody, CardHeader, Col, Collapse, Fade,  Row} from 'reactstrap'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { Select } from '@material-ui/core';


class SlackForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          vote: "Hot",
          region : "1"

    };
  
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    onChange = e => {
      console.log(e.target.value)
        this.setState({[e.target.id]: e.target.value})
    }

  
    handleSubmit(event) {
     
      
      if(this.state.vote === "" || this.state.region === ""){
        alert("Invalid choice please choose a valid option ")

      }
      else{
        alert("Your choice is  " + this.state.vote + " and " + "Region " + this.state.region)
             /*  axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 */

      }

      event.preventDefault();
    }
  
    render() {
      console.log(this.state)

      return (
        <div className = "center">
   
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
                        <option value="1">Region 1</option>
                        <option value="2">Region 2</option>
                        <option value="3">Region 3</option>
                        <option value="4">Region 4</option>
                      </FormControl>
                  </FormGroup>
              </Form>
              <Button type = "submit" value ="Submit" onClick = {this.handleSubmit}>Submit
              </Button>
            </CardBody>
          </Card>  
        </div>
      );
    }
  }
  
 export default SlackForm
    
