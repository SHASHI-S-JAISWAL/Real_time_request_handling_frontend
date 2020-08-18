import React,{Component} from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import openSocket from 'socket.io-client';
import Button from 'react-bootstrap/Button'

export default class Approved extends Component{
   
    constructor(props) {
        super(props);
        this.state = {
            response: 0,
            allreq: [],
            endpoint: this.props.endpoint,
            login: this.props.login,
            user: this.props.user,
            dept: this.props.dept
        };
    }
     formatDate(date) {
        var d = new Date(date).toLocaleString();
        return d ;
    }

     compare =( a, b ) => {
        if ( a.date < b.date ){
          return -1;
        }
        if ( a.date > b.date ){
          return 1;
        }
        return 0;
      }
      
    
    componentDidMount() {
        const socket = openSocket(this.props.endpoint);
        socket.emit('request all req','asd');
        socket.on('response all req', (data)=>{
            let a = data;
            let b=[];
            for (let i of a){
                if(i.created_by == this.state.user  && i.status == "approved")
                   { b.push(i)}
            }
            let s = new Set(b)
            let k = [...s]
            k= k.sort( this.compare ).splice(-5);
            this.setState({allreq : k});
            console.log(this.state.allreq)
            this.setState({response : 1})
        })
      } 
    render(){
        return(
            <div className = 'mt-5 d-flex justify-content-left'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>date</th>
                        <th>Created By</th>
                        <th>Requested User</th>
                        <th>Message</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.allreq.map((a) => {
                            console.log(a.created_by);
                            return (<tr>
                            <td>{this.formatDate(a.date)}</td>
                            <td>{a.created_by}</td>
                            <td>{a.to_user}</td>
                            <td>{a.message}</td>
                            </tr>)

                        })}
                        
                    </tbody>
                    </Table>
            </div>
        )
    }
}