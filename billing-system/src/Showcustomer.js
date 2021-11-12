import './Showproducts.css';
import {Link} from 'react-router-dom';
import React from 'react'
import axios from 'axios';
export default class Customer_Detials extends React.Component{
    constructor(props){
        super(props);
        this.deleteCustomer=this.deleteCustomer.bind(this)
        this.state={
            value:this.props.location.state,
            custid:"",
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
      deleteCustomer(cust_id){
          
          this.setState({
            custid:cust_id
          })
          
          const {custid}= this.state;
          const customer = {main_id:cust_id};
          console.log("custiddddd",cust_id);
          axios.post('http://localhost:5000/delete_customers',customer).then((result)=>{
              if(result.data=="Success"){
                  alert("Customer deleted successfully")
                  window.location="http://localhost:3000/showcustomer";
              }
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
            <button class="btn-primary btn" onClick={()=> this.deleteCustomer(customer._id)}>Delete customer</button>
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