// import { useParams } from 'react-router';
// import './Showbill.css';
// function Showbill(){
//     const {id}=useParams();
//     console.log(id);
//     return(
//         <div>
//             This is the show bills page!!!
//         </div>
//     )
// }
// export default Showbill;

import "./Showbill.css";
import { Link, useParams, withRouter } from "react-router-dom";
import React from "react";
import axios from "axios";
class Showbill extends React.Component {
	constructor(props) {
		super(props);
		this.print = this.print.bind(this);
		this.state = {
			billnumber: this.props.match.params.id,
			value: this.props.location.state,
			bills: [],
			bill_details: [],
		};
	}
	componentDidMount() {
		axios
			.get("http://localhost:5000/fetch_bills", {
				params: { id: this.state.billnumber },
			})
			.then((result) => {
				console.log(result.data);
				this.setState({
					bills: result.data,
				});
			});
		axios
			.get("http://localhost:5000/fetch_bill_details", {
				params: { id: this.state.billnumber },
			})
			.then((result) => {
				this.setState({
					bill_details: result.data,
				});
				console.log(this.state.bill_details);
			});
	}
	print(){
		window.print();
	}
	render() {
		const values = this.state.value;
		const billdetails = this.state.bill_details.map((bill) => (
			<div style={{ border: "1px solid black" }} key={bill._id}>
				<p>Bill Number : {bill.billnumber}</p>
				<p>Customer Name : {bill.customer_name}</p>
				<p>Date Of Supply : {bill.date_of_supply}</p>
				<p>Total Amount : {bill.total_amount}</p>
				<p>GST : {bill.gst}</p>
				<p>Place Of Supply : {bill.place_of_supply}</p>
				<p>Transporter Info : {bill.transporter_info}</p>
				<p>GST NO : {bill.gst_no}</p>
				<p>Billing address : {bill.billing_address}</p>
			</div>
		));
		const bill = this.state.bills.map((bill) => (
			<div style={{ border: "1px solid black" }} key={bill._id}>
				<h3>Product Name : {bill.product_name}</h3>
				<p>Quantity : {bill.quantity}</p>
				<p>Amount : {bill.amount}</p>
			</div>
		));

		return (
			<div>
				{billdetails}
				{bill}
				<div>
					<Link
						to={{
							pathname: "/show",
							state: values,
						}}
					>
						Back to Home page
					</Link>
				</div>
				<button onClick={this.print}>Print</button>
			</div>
		);
	}
}

export default withRouter(Showbill);
