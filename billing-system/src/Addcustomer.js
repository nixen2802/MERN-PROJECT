import './Addcustomer.css';
import React, { Component } from "react";
import axios from "axios";
class Addcustomer extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.cancel=this.cancel.bind(this);
		this.state = {
			value:this.props.location.state,
			cust_name: "",
			gst_no: "",
			billing_address: "",
			email: ""
		};
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { cust_name, gst_no, billing_address, email } = this.state;

		const customer = {
			cust_name, gst_no, billing_address, email 
		};
		this.setState({
			cust_name: "",
			gst_no: "",
			billing_address: "",
			email: ""
		});
		axios
			.post("http://localhost:5000/addcustomer", customer)
			.then((result) => {
				console.log(result.data);
				if (result.data === "Success") {
					this.props.history.push({
						pathname: '/showcustomer',
						  state: this.state.value // your data array of objects
					  })
				} else {
					alert("You have enetered something wrong!!!");
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};
	cancel(){
		this.props.history.push({
			pathname: '/showcustomer',
			state: this.state.value // your data array of objects
		  })
	}
	render() {
		return (
			<div>
				<div class="limiter">
					<div class="container-login100">
						<div class="wrap-login100">
							<form
								class="login100-form validate-form"
								onSubmit={this.handleSubmit}
							>
								<span class="login100-form-title">
									Add Customer
								</span>
								<div
									class="wrap-input100 validate-input"
								>
									<input
										class="input100"
										type="text"
										name="cust_name"
										placeholder="Customer Name"
										onChange={this.handleInputChange}
										value={this.state.cust_name}
									/>
									<span class="focus-input100"></span>
									<span class="symbol-input100">
										<i
											class="fa fa-envelope"
											aria-hidden="true"
										></i>
									</span>
								</div>
                                <div
									class="wrap-input100 validate-input"
								>
									<input
										class="input100"
										type="text"
										name="gst_no"
										placeholder="GST No."
										onChange={this.handleInputChange}
										value={this.state.gst_no}
									/>
									<span class="focus-input100"></span>
									<span class="symbol-input100">
										<i
											class="fa fa-lock"
											aria-hidden="true"
										></i>
									</span>
								</div>
                                <div
									class="wrap-input100 validate-input"
								>
									<input
										class="input100"
										type="text"
										name="billing_address"
										placeholder="Billing Address"
										onChange={this.handleInputChange}
										value={this.state.billing_address}
									/>
									<span class="focus-input100"></span>
									<span class="symbol-input100">
										<i
											class="fa fa-lock"
											aria-hidden="true"
										></i>
									</span>
								</div>
								<div
									class="wrap-input100 validate-input"
								>
									<input
										class="input100"
										type="text"
										name="email"
										placeholder="Email"
										onChange={this.handleInputChange}
										value={this.state.email}
									/>
									<span class="focus-input100"></span>
									<span class="symbol-input100">
										<i
											class="fa fa-lock"
											aria-hidden="true"
										></i>
									</span>
								</div>
								<div class="container-login100-form-btn">
									<button class="login100-form-btn">
										Add
									</button>
								</div>
							</form>
							<div class="container-login100-form-btn">
								<button style={{color: "black"}} class="btn btn-danger" onClick={this.cancel}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Addcustomer;
