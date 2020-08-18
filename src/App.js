import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route,Redirect} from 'react-router-dom';
import Formc from './components/Form'
import Pending from './components/Pending'
import Approved from './components/Approved'
import Request from './components/Request'
import Notification from './components/Notification'
import Navigator from './components/Navigator'
import openSocket from 'socket.io-client';
import Signin from './components/Signin';
class App extends Component {

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)
    this.state = {
        user :"",
        dept :"",
        login :false,
        response: 0,
        endpoint: 'https://request-handling-backend.herokuapp.com/'
    };}


  componentDidMount() {
    const socket = openSocket(this.state.endpoint);
    //socket.emit('hi')
    //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    socket.on('hi', data => this.setState({response: data[1].title}));
    /*socket.emit('my other event','shas12345hi');
    socket.on('event',function (data) {
        console.log(data);
    });*/
  } 

  handler(u1,d1) {
    this.setState({
      login: true,
      user :u1,
      dept :d1
    })

  }
  render() {
    

    return (
      <div className = 'App'>
        <BrowserRouter>
        
          { (this.state.login)? <div><Navigator nav = '1' login={this.state.login} user={this.state.user} dept={this.state.dept}></Navigator>  </div> :<div><Redirect to ='/'/></div>}
          <Switch>
            <Route path = '/' component = {() => <Signin  endpoint={this.state.endpoint} handler = {this.handler}/>} exact /> 
            <Route path = '/form' component = {() => <Formc endpoint={this.state.endpoint} login={this.state.login} user={this.state.user} dept={this.state.dept} />} exact /> 
            <Route path = '/pending' component = {() => <Pending endpoint={this.state.endpoint}  login={this.state.login} user={this.state.user} dept={this.state.dept}  />} exact />
            <Route path = '/approved' component = {() => <Approved endpoint={this.state.endpoint}  login={this.state.login} user={this.state.user} dept={this.state.dept}  />} exact />
            <Route path = '/request' component = {() => <Request endpoint={this.state.endpoint}  login={this.state.login} user={this.state.user} dept={this.state.dept} />} exact />
            <Route path = '/notification' component = {() => <Notification endpoint={this.state.endpoint}  login={this.state.login} user={this.state.user} dept={this.state.dept}  />} exact />
          </Switch>
        
          { (this.state.login)? <Redirect to="/form" />:<h1> </h1> }
            
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
