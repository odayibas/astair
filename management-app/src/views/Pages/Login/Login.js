import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Form, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
class Login extends Component {

  render() {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
               <CardGroup>
                <Card className="p-4">
                  <CardBody>
                   <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                         <InputGroupText>
                            <i className="icon-user"></i>
                         </InputGroupText>  
                        </InputGroupAddon>
                        <input type="text" placeholder="Username"  autoComplete="username"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                           <InputGroupText> 
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="password" placeholder="Password"  autoComplete="current-password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                        <Button>
                        <Link to="/dashboard">Login</Link>
                        </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;