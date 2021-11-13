import "./Show.css";
import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
export default class Detials extends React.Component {
	constructor(props) {
		super(props);
		this.deleteBill = this.deleteBill.bind(this);
		this.state = {
			value: this.props.location.state,
			bills: [],
			customer: [],
			bill_number: ""
		};
	}
	componentDidMount() {
		axios.get("http://localhost:5000/fetch").then((result) => {
			this.setState({
				bills: result.data,
			});
		});
	}
	deleteBill(bill_no) {
		this.setState({
			bill_number: bill_no,
		});

		const { billid } = this.state;
		const bill = { main_id: bill_no };
		console.log("Temp printer : ",billid)
		axios
			.post("http://localhost:5000/delete_bill", bill)
			.then((result) => {
				if (result.data == "Success") {
					alert("Bill deleted successfully");
					window.location = "http://localhost:3000/show";
				}
				else
				{
					alert("There is some error with server please try again later!!!")
				}
			});
	}
	render() {
		const values = this.state.value;
		const bill = this.state.bills.map((bill) => (
			<div className="col-xl-6 col-lg-6 col-md-12 col-xl-3">
				<div
					class="card customShadow"
					key={bill._id}
					style={{ marginTop: "15px" }}
				>
					<div class="card-header">
						Bill Number : {bill.billnumber}
					</div>
					<div class="card-body">
						<h5 class="card-title">{bill.company_name}</h5>
						<div class="billDetails">
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
								<p>{bill.total_amount-bill.gst}</p>
								<p>{bill.gst}</p>
								<p>{bill.place_of_supply}</p>
								<p>{bill.transporter_info}</p>
								<p>{bill.gst_no}</p>
								<p>{bill.billing_address}</p>
							</div>
						</div>
						<Link
							to={{
								pathname: `/showbill/${bill.billnumber}`,
								state: values,
							}}
							className="btn"
							style={{
								backgroundColor: "#9053c7",
								color: "white",
								marginTop: "20px",
							}}
						>
							₹{bill.total_amount}
						</Link>
					</div>
					<div class="card-footer">
						<Link
							to={{
								pathname: `/showbill/${bill.billnumber}`,
								state: values,
							}}
							className="btn btn-outline-primary"
						>
							More Info
						</Link>
						<button
							class="btn-outline-danger btn"
							style={{ fontSize: "14px" }}
							onClick={() => this.deleteBill(bill.billnumber)}
						>
							Delete Bill
						</button>
					</div>
				</div>
			</div>
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
							style={{ marginRight: "15px" }}
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
			<div className="container mx-auto" style={{ margin: "0px" }}>
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
							marginRight: "15px",
							marginBottom: "15px",
						}}
					>
						Add bill
					</Link>
					<Link
						to={"/"}
						className="btn"
						style={{
							backgroundColor: "#fcf93c",
							marginTop: "15px",
							marginRight: "15px",
							marginBottom: "15px",
						}}
					>
						Logout
					</Link>
				</div>
				<div>{renderElement()}</div>
			</div>
		);
	}
}
