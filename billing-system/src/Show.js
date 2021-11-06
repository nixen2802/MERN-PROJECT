import './Show.css';
import {Link, useParams} from 'react-router-dom';
import React from 'react'
import axios from 'axios';
export default class Detials extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.location.state,
            bills: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/fetch').then((result)=>{
            this.setState({
                bills: result.data
              });
        })
      }
render(){
  const values=this.state.value;
    const bill = this.state.bills.map(bill => (
        <div style={{ border: "1px solid black" }} key={bill._id}>
        <Link to={{
          pathname: `/showbill/${bill.billlnumber}`,
          state: values}}>
          <h3>{bill.billlnumber}</h3>
          <p>{bill.company_name}</p>
          <p>{bill.total_amount}</p>
          </Link>
        </div>
      ));
      function renderElement(){
        if(values.email==="nayanmandaliya01@gmail.com")
        {
            return(
                <div>
                <Link to={{
                    pathname: "/showproducts",
                    state: values // your data array of objects
                  }}>
                    <button className="btn btn-outline-secondary">View Products</button>
                </Link>
                </div>
                )
        }
        return null;
     }
     
return (
    <div>
        {bill}
        <div>
        <Link to={{
            pathname: "/addbill",
            state: values
          }}>
            Add bill
            </Link>
        </div>
        <div>
            { renderElement() }
        </div>
        <div>
            <Link to={'/'}>
            Logout
            </Link>
      </div>
    </div>
    )
}

}