import "./Showproducts.css";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
export default class Customer_Detials extends React.Component {
	constructor(props) {
		super(props);
		this.deleteCustomer = this.deleteCustomer.bind(this);
		this.state = {
			value: this.props.location.state,
			custid: "",
			customers: [],
		};
	}
	componentDidMount() {
		axios.get("http://localhost:5000/fetch_customers").then((result) => {
			this.setState({
				customers: result.data,
			});
		});
	}
	deleteCustomer(cust_id) {
		this.setState({
			custid: cust_id,
		});

		const { custid } = this.state;
		const customer = { main_id: cust_id };
		console.log("custiddddd", cust_id);
		axios
			.post("http://localhost:5000/delete_customers", customer)
			.then((result) => {
				if (result.data == "Success") {
					alert("Customer deleted successfully");
					window.location = "http://localhost:3000/showcustomer";
				}
			});
	}
	render() {
		const values = this.state.value;
		const customer = this.state.customers.map((customer) => (
			// <div style={{ border: "1px solid black" }} key={customer._id}>
			//   <h3>{customer.cust_name}</h3>
			//   <p>{customer.gst_no}</p>
			//   <p>{customer.billing_address}</p>
			//   <Link to={{pathname: `/updatecustomer/${customer._id}`, state: {value: this.state.value, customer: customer}}}>
			//         <h1>Update Customer</h1>
			//     </Link>
			//     <button class="btn-primary btn" onClick={()=> this.deleteCustomer(customer._id)}>Delete customer</button>
			// </div>
			<div className="col-xl-12 col-lg-12 col-md-12" key={customer._id}>
				<div class="card customShadow" style={{ marginTop: "15px" }}>
					<div class="card-header">Gst no : {customer.gst_no}</div>
					<div class="card-body">
						<h5 class="card-title">Name : {customer.cust_name}</h5>
						<div class="billDetails">
							<div className="billDetailTags">
								<p>Billing Address : </p>
							</div>
							<div className="billDetailsValues">
								<p>{customer.billing_address}</p>
							</div>
						</div>
					</div>
					<div class="card-footer card-footer-custom">
						<Link
							to={{
								pathname: `/updatecustomer/${customer._id}`,
								state: {
									value: this.state.value,
									customer: customer,
								},
							}}
							style={{ fontSize: "14px" }}
							className="btn btn-outline-primary"
						>
							Update Customer
						</Link>
						<button
							class="btn-outline-danger btn"
							style={{ fontSize: "14px" }}
							onClick={() => this.deleteCustomer(customer._id)}
						>
							Delete customer
						</button>
					</div>
				</div>
			</div>
		));

		function renderViewProductsButton() {
			if (values.email === "nayanmandaliya01@gmail.com") {
				return (
					<li>
						<Link
							to={{
								pathname: "/showproducts",
								state: values, // your data array of objects
							}}
							style={{ color: "black" }}
						>
							View Products
						</Link>
					</li>
				);
			}
			return null;
		};
		function renderViewCustomersButton() {
			if (values.email === "nayanmandaliya01@gmail.com") {
				return (
					<li>
						<Link
							to={{
								pathname: "/showcustomer",
								state: values, // your data array of objects
							}}
							style={{ color: "black", borderBottom: "2px solid #f6b024", }}
						>
							View Customers
						</Link>
					</li>
				);
			}
			return null;
		};

		function renderAddCustomerButton() {
			return (
				<li>
					<Link
						to={{
							pathname: "/addcustomer",
							// state: this.state.value,
						}}
						style={{ color: "black" }}
					// className="btn btn-outline-secondary"
					>
						Add Customer
					</Link>
				</li>
			)
		}


		return (
			<div>
				<div style={{ background: "rgba(0, 0, 0, 0.1)", position: "absolute" }} id="header" class="fixed-top d-flex align-items-center">
					<div
						class="
						container
						d-flex
						align-items-center
						justify-content-between
					"
					>
						<h1 class="logo">
							<a style={{ color: "black" }} href="#">
								HRN
							</a>
						</h1>

						<nav id="navbar" class="navbar">
							<ul>
								<li>
									<Link
										to={{
											pathname: "/addbill",
											state: this.state.value,
										}}
										style={{ color: "black" }}
										class="nav-link scrollto"
										href="#hero"
									>
										Add bill
									</Link>
								</li>
								{renderAddCustomerButton()}
								{renderViewProductsButton()}
								{renderViewCustomersButton()}
								<li>
									<Link
										to={"/"}
										style={{ color: "black" }}
										class="nav-link scrollto"
										href="#about"
									>
										Logout
									</Link>
								</li>
							</ul>
							<i class="bi bi-list mobile-nav-toggle"></i>
						</nav>
					</div>
				</div>
				<div className="container">
					<div className="row row-content" style={{ margin: "0px", marginTop: "100px" }}>{customer}</div>
					<div>
						<Link
							className="btn btn-outline-secondary"
							style={{
								marginTop: "20px",
								marginLeft: "15px"
							}}
							to={{ pathname: "/show", state: this.state.value }}
						>
							Back to bills
						</Link>
					</div>
				</div>
				<div>
					<br />
					<br />
					<br />
					<footer style={{ background: "rgba(0, 0, 0, 0.1)", width: "100%" }} id="footer">
						<div class="container" id="contact">
							<div style={{ color: "black" }} class="copyright">
								&copy; Copyright{" "}
								<strong>
									<span>HSN</span>
								</strong>
								. All Rights Reserved
							</div>
							<div style={{ color: "black" }} class="credits">
								Designed by
								<a href="#"> Rushabh, Nayan, Hussein</a>
							</div>
						</div>
					</footer>
					<br />
				</div>
			</div>
		);
	}
}
