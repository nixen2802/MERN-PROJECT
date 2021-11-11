import './Showproducts.css';
import {Link} from 'react-router-dom';
import React from 'react'
import axios from 'axios';
export default class Customer_Detials extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.location.state,
            customers: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/fetch_customers').then((result)=>{
            this.setState({
                customers: result.data
              });
        })
      }
render(){
    const customer = this.state.customers.map(customer => (
        <div style={{ border: "1px solid black" }} key={customer._id}>
          <h3>{customer.cust_name}</h3>
          <p>{customer.gst_no}</p>
          <p>{customer.billing_address}</p>
          <Link to={{pathname: `/updatecustomer/${customer._id}`, state: {value: this.state.value, customer: customer}}}>
                <h1>Update Customer</h1>
            </Link>
        </div>
      ));
     
return (
    <div>
        {customer}
        <div>
            <Link to={{pathname: "/addcustomer", state: this.state.value}}>
                Add Customer
            </Link>
            <Link to={{pathname: "/show", state: this.state.value}}>
                Back to bills
            </Link>
      </div>
    </div>
    )
}

}