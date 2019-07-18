import React, { Component } from 'react'
import mySvg from './blueprint.png'
import axios from 'axios'
import { Badge, CardFooter,Button, Card, CardBody, CardHeader, Col, Collapse, Fade,  Row} from 'reactstrap'


class Monitor extends Component {

  constructor(props) {
  super(props)
  this.state = {file: '',imageUrl: ''};

  }
  handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('upload', this.state.file);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    
    let {imageUrl} = this.state;
    let $image = null;
    if (imageUrl) {
      $image = (<img src={imageUrl} />);
    } else {
      $image = (<div>Please select an Image </div>);
    }

    return (
      <div style = {{ padding : '50px'}}>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this.handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
        </form>
        <div style={{width : '100%', display : 'flex',justifyContent : 'center', alignItems : 'center'}}>
          {$image}
        </div>
      </div>
    )
  }

}
export default Monitor;
