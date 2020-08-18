import React,{Component} from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import openSocket from 'socket.io-client';
import Button from 'react-bootstrap/Button'

export default class Notification extends Component{
  
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
                if((i.created_by == this.state.user  && (i.status == "approved" || i.status == "rejected")) || i.to_dept == this.state.dept  && (i.status == "Pending")) 
                   { b.push(i)}
            }
            let s = new Set(b)
            let k = [...s]
            k= k.sort( this.compare ).splice(-5);
            console.log(k)
            let n = []
            for (let j of k){
                if(j.status == 'Pending')
                    {j.note = j.created_by + '  has made a request';
                        n.push(j)};
                if(j.status == 'rejected')
                {j.note = j.to_user  + '  has rejected your request';
                    n.push(j)};
                if(j.status == 'approved')
                {j.note = j.to_user  + '  has approved your request';
                    n.push(j)};
            }
            n =new Set(n)
            n= [...n]
            this.setState({allreq : n });
            console.log(this.state.allreq)
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
                        <th>Notification</th>
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
                            <td>{a.note}</td>
                            </tr>)

                        })}
                        
                    </tbody>
                    </Table>
            </div>
        )
    }
}