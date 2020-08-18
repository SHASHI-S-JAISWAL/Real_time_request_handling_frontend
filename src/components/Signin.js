import React, { Component } from "react";
//import './Signin.css';
import {Image,Col}  from 'react-bootstrap';
import openSocket from 'socket.io-client';
import { Route } from "react-router-dom";

export default class Signin extends Component {
    constructor(props){
        super(props);
        this.state ={
            user:'',
            password:''
        }
    }


    login =() =>{
        const socket = openSocket(this.props.endpoint)
        socket.emit('geUD','')
        let all ;
        socket.on('allUD',(data) => { all = data;
        
        let  flag =0, u1='', d1='';
        for (let a of all){
            if (a.name == this.state.user)
            if(a.password == this.state.password)
                {flag =1;
                    u1 =a.name;
                    d1 =a.dept;}
        };
        if(flag == 1 ){
            this.props.handler(u1,d1);
        }
        else
        alert('login fail')

        });
    }
    handleChange = (e) =>{
        const {name , value } = e.target
        this.setState({[name]:value })
      }

    render() {
        return (
            <div id ="bg" className=" d-flex justify-content-left mt-5 pt-5">
                <Col xs={5} md={7}>
                <Image src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/121002887/original/9f2174ec1236e128859a8ad2ff98a5a21a0230b7/sdwdwdwwqwfhijwwfwefh-eif-wehfiwehf-i-hwei.jpg' fluid />
                </Col>
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" name='user' className="form-control" placeholder="Enter User Name" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name ='password' className="form-control" placeholder="Enter password" onChange={this.handleChange}/>
                </div>

                {/*<div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type='button' onClick = {this.login} className="btn btn-primary btn-block">Submit</button>
                {/*<p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
        <       /p>*/}
            </form>
            </div>
        );
    }
}