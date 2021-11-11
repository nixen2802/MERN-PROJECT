import "./Show.css";
import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
export default class Detials extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.location.state,
			bills: [],
			customer: []
		};
	}
	componentDidMount() {
		axios.get("http://localhost:5000/fetch").then((result) => {
			this.setState({
				bills: result.data,
			});
		});
	}
	render() {
		const values = this.state.value;
		const bill = this.state.bills.map((bill) => (
			<div key={bill._id}>
			<Link
			to={{
				pathname: `/showbill/${bill.billnumber}`,
				state: values,
			}}>
				<div>
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
			</Link>
			</div>
			// <div className="col-lg-3 col-md-12 col-xl-3">
			// 	<div class="card" key={bill._id} style={{ marginTop: "15px" }}>
			// 		<div class="card-header">
			// 			Bill Number : {bill.billlnumber}
			// 		</div>
			// 		<div class="card-body">
			// 			<h5 class="card-title">{bill.company_name}</h5>
			// 			<p class="card-text">
			// 				With supporting text below as a natural lead-in to
			// 				additional content.
			// 			</p>
			// 			<Link
			// 				to={{
			// 					pathname: `/showbill/${bill.billlnumber}`,
			// 					state: values,
			// 				}}
			// 				className="btn"
			// 				style={{
			// 					backgroundColor: "#9053c7",
			// 					color: "white",
			// 				}}
			// 			>
			// 				₹{bill.total_amount}
			// 			</Link>
			// 		</div>
			// 		<div class="card-footer">
			// 			<Link
			// 				to={{
			// 					pathname: `/showbill/${bill.billlnumber}`,
			// 					state: values,
			// 				}}
			// 				className="btn btn-outline-primary"
			// 			>
			// 				More Info
			// 			</Link>
			// 		</div>
			// 	</div>
			// </div>
		));
		function renderElement() {
			if (values.email === "nayanmandaliya01@gmail.com") {
				return (
					<div>
						<Link
							to={{
								pathname: "/showproducts",
								state: values, // your data array of objects
							}}
						>
							<button className="btn btn-outline-secondary">
								View Products
							</button>
						</Link>
						<Link
							to={{
								pathname: "/showcustomer",
								state: values, // your data array of objects
							}}
						>
							<button className="btn btn-outline-secondary">
								View Customers
							</button>
						</Link>
					</div>
				);
			}
			return null;
		}

		return (
			<div className="container" style={{ margin: "0px" }}>
				<div className="row row-content">{bill}</div>
				<div>
					<Link
						to={{
							pathname: "/addbill",
							state: values,
						}}
						className="btn btn-outline"
						style={{
							backgroundColor: "#fcf93c",
							marginTop: "15px",
						}}
					>
						Add bill
					</Link>
				</div>
				<div>{renderElement()}</div>
				<div>
					<Link
						to={"/"}
						className="btn"
						style={{
							backgroundColor: "#fcf93c",
							marginTop: "15px",
						}}
					>
						Logout
					</Link>
				</div>
			</div>
		);
	}
}
