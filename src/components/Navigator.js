import React, { Component } from 'react';
import {NavLink,Route, Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import {Nav,Navbar} from 'react-bootstrap';

export default class Navigation extends Component{
    
    constructor(props) {
            super(props);
            this.state = {
                response: 0,
                login: this.props.login,
                user: this.props.user,
                dept: this.props.dept
            }}

    nav =(a) =>{
        this.setState({response : a})
    }

    render(){
        return(
            <div>
            <Navbar bg="primary" variant="dark">
            <Button variant="primary" onClick ={() => this.nav("/form")} >Form</Button>
            <Button variant="primary" onClick ={() => this.nav("/pending")} >Pending</Button>
            <Button variant="primary" onClick ={() => this.nav("/approved")} >Approved</Button>
            <Button variant="primary" onClick ={() => this.nav("/request")} >Request (For Approval)</Button>
            <Button variant="primary" onClick ={() => this.nav("/notification")} >Notification</Button>
            
            {/*<Nav className="mr-auto">
              
              <Nav.Link href="/form" >Form</Nav.Link>
              <Nav.Link href="/pending">Pending</Nav.Link>
              <Nav.Link href="/approved">Approved</Nav.Link>
              <Nav.Link href="/request">Request</Nav.Link>
              <Nav.Link href="/notification">Notification</Nav.Link>
              <Button variant="primary" onClick ={this.nav} className="mr-sm-2" >Request</Button>
        </Nav>
            <div className="mr" >
            <Nav  >
            <Nav.Link eventKey={2} href="/"  >
                Logout
            </Nav.Link>
            </Nav>
            </div>*/}
            <Navbar.Collapse className="justify-content-end"  >
                <Navbar.Text>
                Signed in as: {this.state.user +"     "}   
                </Navbar.Text>
                <Nav  >
            <Nav.Link eventKey={2} href="/"  >
                Logout
            </Nav.Link>
            </Nav>
            </Navbar.Collapse>
            
            </Navbar>
            {this.state.response != 0 ?<Redirect to={this.state.response} />:<h1></h1>}
            </div>
        )
    }
}