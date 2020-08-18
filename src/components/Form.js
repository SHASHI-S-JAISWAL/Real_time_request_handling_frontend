import React,{Component} from 'react';
import {Form} from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import openSocket from 'socket.io-client';

export default class Formc extends Component{
  constructor(props) {
    super(props);
 
    this.state = {
      isShow: true,
      resp:'',
      login: this.props.login,
      user: this.props.user,
      dept: this.props.dept,
      alluser:[],
      alldept:[],
      endpoint: this.props.endpoint,
      todept :'',
      touser : '',
      message:''
      
    };
  }

  componentDidMount() {
    const socket = openSocket(this.state.endpoint);
    socket.emit('geUD','')
    let all;
    socket.on('allUD',(data) => { all = data;
      for (let a of all){
        this.state.alldept.push(a.dept)
        this.state.alluser.push(a.user)
      }
    
    });
  
  }

  submit_req =() =>{
    
    const socket = openSocket(this.state.endpoint);
    socket.on('my other event', function (data) {
      console.log(data);
  });
  if(this.state.created_by == '' || this.state.todept == '' ||this.state.touser == '' ||this.state.message == ''   )
    {alert('Please fill all the details') ;
    return ;}
  let d1 = new Date(); 
  const re = {
            created_by :this.state.user,
            to_dept: this.state.todept,
            to_user : this.state.touser,
            date : d1,
            message: this.state.message 
  }
  console.log(re)
  socket.emit('get request',re);
  socket.on('send request',function (data) {
      console.log(data);
      alert('Request Submitted');
      document.getElementById('r1').click();
  });

  }

  handleChange = (e) =>{
    const {name , value } = e.target
    this.setState({[name]:value })
  }
    render(){
        return(
            <div className="mt-5 d-flex justify-content-around " >
              <Form>
              <Form.Group>
              
              <Form.Row>
                <Form.Label column lg={4}>
                  Created By
                </Form.Label>
                <Col>
                  <Form.Control  type="text" placeholder={this.state.user} name= 'user'  onChange={this.handleChange} />
                </Col>
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Label column="sm" lg={4}>
                  Department
                </Form.Label>
                <Col>
                <Form.Control as="select" title="Dropdown right" name = 'todept' onChange={this.handleChange} >
                  <option>Select Department</option>
                  <option>dept1</option>
                  <option>dept2</option>
                  
                </Form.Control>
                </Col>
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Label column="sm" lg={4}>
                  Users
                </Form.Label>
                <Col>
                <Form.Control as="select" name = 'touser' onChange={this.handleChange} >
                  <option>Select User</option>
                  {(this.state.todept == 'dept1')?<option>user1</option>:<option>user5</option>}
                  {(this.state.todept == 'dept1')?<option>user2</option>:<option>user6</option>}
                  {(this.state.todept == 'dept1')?<option>user3</option>:<option>user7</option>}
                  {(this.state.todept == 'dept1')?<option>user4</option>:<option>user8</option>}
                </Form.Control>
                </Col>
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Label column="sm" lg={4}>
                  Message
                </Form.Label>
                <Col>
                <Form.Control as="textarea" rows="3"  name = 'message' onChange={this.handleChange} />
                </Col>
              </Form.Row>
              </Form.Group>
              <br />
              <Button variant="primary" onClick = {this.submit_req} >Submit</Button>{'      '}
              <Button variant="secondary" id = 'r1' type = 'reset'>Reset</Button>
              
              </Form>
            </div>
        )
    }
}