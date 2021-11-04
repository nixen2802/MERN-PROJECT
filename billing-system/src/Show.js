import './Show.css';
import {Link} from 'react-router-dom';
import React from 'react'
import axios from 'axios';
export default class Detials extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.location.state,
            bills: []
        }
        console.log(this.props.location.state)
    }
    componentDidMount() {
        axios.get('http://localhost:5000/fetch').then((result)=>{
            this.setState({
                bills: result.data
              });
        })
      }
render(){
    const bill = this.state.bills.map(bill => (
        <div style={{ border: "1px solid black" }} key={bill._id}>
          <h3>{bill.name}</h3>
          <p>{bill.quantity}</p>
          <p>{bill.price}</p>
        </div>
      ));
return (
    <div>
        {bill}
        <div>
            <Link to={'/addbill'}>
            Add bill
            </Link>
      </div>
    </div>
    )
}

}