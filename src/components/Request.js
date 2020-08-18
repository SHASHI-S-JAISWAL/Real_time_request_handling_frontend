import React,{Component} from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import openSocket from 'socket.io-client';
import Button from 'react-bootstrap/Button'

export default class Request extends Component{
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
                if(i.to_user == this.state.user && i.status == "Pending")
                   { b.push(i)}
            }
            let s = new Set(b)
            let k = [...s]
            k = k.sort( this.compare ).splice(-5);
            this.setState({allreq : k});
            console.log(this.state.allreq)
        })
      } 
       formatDate(date) {
        var d = new Date(date).toLocaleString();
    
        return d;
    }

    act(i,status ){
        const socket = openSocket(this.props.endpoint);
        let data = {
            id : i,
            status : status
        };
        console.log(data)
        socket.emit('update',data);
        this.componentDidMount();
    }

    render(){
        return(
            <div className = 'mt-5 d-flex justify-content-left'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>date</th>
                        <th>Created By</th>
                        <th>Message</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.allreq.map((a) => {
                            console.log(a.created_by);
                            return (<tr>
                            <td>{this.formatDate(a.date)}</td>
                            <td>{a.created_by}</td>
                            <td>{a.message}</td>
                            <td><Button variant="primary" size="sm" onClick={()=>this.act(a._id,'approved')} >Approve</Button>{' '}
                            <Button variant="primary" size="sm" onClick={()=>this.act(a._id,'rejected') }>Reject</Button></td>
                            </tr>)

                        })}
                        
                    </tbody>
                    </Table>
            </div>
        )
    }
}