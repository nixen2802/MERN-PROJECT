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
			total_amount: 0
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
				console.log("Somtsdvubsivdusuvdsvdviosdocvsnodcn");
				console.log(this.state.bill_details);
				this.setState({
					total_amount: this.state.bill_details[0].total_amount
				});
			});
	}
	print() {
		window.print();
	}
	render() {
		const values = this.state.value;
		const billdetails = this.state.bill_details.map((bill) => (
			<div key={bill._id}>
				<div className="card-header">
					Bill Number : {bill.billnumber}
				</div>
				<div className="card-body">
					<h5 className="card-title" style={{ marginBottom: "6%" }}>
						{bill.company_name}
					</h5>
					<div class="billdetails">
						<div className="billDetailTags">
							<p>Customer Name : </p>
							<p>Date Of Supply : </p>
							<p>Total Amount : </p>
							<p>GST : </p>
							<p>Place Of Supply : </p>
							<p>Transporter Info : </p>
							<p>GST NO : </p>
							<p>Billing address : </p>
						</div>
						<div className="billDetailsValues">
							<p>{bill.customer_name}</p>
							<p>{bill.date_of_supply}</p>
							<p>{bill.total_amount}</p>
							<p>{bill.gst}</p>
							<p>{bill.place_of_supply}</p>
							<p>{bill.transporter_info}</p>
							<p>{bill.gst_no}</p>
							<p>{bill.billing_address}</p>
						</div>
					</div>
				</div>
			</div>
		));
		const bill = this.state.bills.map((bill) => (
			<div className="row row-content" key={bill._id}>
				<div
					class="placement
						col-lg-4
						col-md-4
						col-sm-4
						billItems
					"
				>
					{bill.product_name}
				</div>
				<div
					class="placement
						col-lg-4
						col-md-4
						col-sm-4
						"
				>
					{bill.quantity}
				</div>
				<div
					class="placement
						col-lg-4
						col-md-4
						col-sm-4
					"
				>
					{bill.amount}
				</div>
			</div>
		));

		return (
			<div className="container" style={{ marginTop: "8%" }}>
				<div className="row row-content">
					<div className="col-12">
						<h1 style={{ textAlign: "center", marginBottom: "2%" }}>
							Final Bill
						</h1>
						<div className="mainBill">
							<div
								className="customShadow card customCard"
								style={{ borderRadius: "6px" }}
							>
								{billdetails}
								<div class="row row-content">
									<div class="col-lg-4 col-md-4 col-sm-4 placement">
										<h4>Item</h4>
									</div>
									<div class="col-lg-4 col-md-4 col-sm-4 placement">
										<h4>Quantity</h4>
									</div>
									<div class="col-lg-4 col-md-4 col-sm-4 placement">
										<h4>Price</h4>
									</div>
								</div>
								<hr />
								<div className="row row-content">{bill}</div>
								<hr />
								<div class="row row-content">
									<div
										class="
										placement
												col-lg-4
												col-md-4
												col-sm-4
												col-xs-4
											"
									>
										TOTAL
									</div>
									<div
										class="
										placement
												col-lg-4
												col-md-4
												col-sm-4
												col-xs-4
											"
										style={{ marginLeft: "31%" }}
									>
										{this.state.total_amount}
									</div>
								</div>
								<div class="card-footer"></div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Link
						to={{
							pathname: "/show",
							state: values,
						}}
						className="btn btn-outline-secondary"
						style={{
							// backgroundColor: "#fcf93c",
							marginTop: "15px",
							marginRight: "15px",
							marginBottom: "15px",
						}}
					>
						Back to Home page
					</Link>
				</div>
				<button
					className="btn btn-outline-secondary"
					onClick={this.print}
				>
					Print
				</button>
			</div>
		);
	}
}

export default withRouter(Showbill);
