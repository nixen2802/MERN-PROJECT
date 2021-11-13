// import './Addbill.css';
// import React, { Component } from "react";
// import axios from "axios";
// class Addbill extends Component {
// 	constructor(props) {
// 		super(props);
// 		// this.handleInputChange=this.handleSubmit.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 		this.state = {
// 			name: "",
// 			quantity: "",
// 			hsn_no: "",
//             price: "",
// 			products: [],
// 			values: this.props.location.state
// 		};
// 	}

// 	handleInputChange = (e) => {
// 		this.setState({
// 			[e.target.name]: e.target.value,
// 		});
// 		for(let i=0;i<this.state.products.length;i++)
// 		{
// 			if(this.state.products[i].name===this.state.name)
// 			{
// 				// if(this.state.quantity!="")
// 				// {
// 					this.setState({
// 						price: this.state.products[i].price*Number(this.state.quantity)
// 					})
// 				// }
// 			}
// 		}
// 	};

// 	handleSubmit = (e) => {
// 		e.preventDefault();

// 		const { name, quantity, hsn_no, price } = this.state;

// 		const bill = {
// 			name, quantity, hsn_no, price
// 		};
// 		this.setState({
// 			name: "",
//             quantity: "",
//             hsn_no: "",
//             price: "",
// 		});
// 		axios
// 			.post("http://localhost:5000/addbill", bill)
// 			.then((result) => {
// 				console.log(result.data);
// 				if (result.data === "Success") {
// 					this.props.history.push({
// 						pathname: '/show',
// 						state: this.state.values
// 					  })
// 				} else {
// 					alert("You have enetered something wrong!!!");
// 				}
// 			})
// 			.catch((err) => {
// 				console.error(err);
// 			});
// 	};
// 	componentDidMount() {
//         axios.get('http://localhost:5000/fetch_products').then((result)=>{
//             this.setState({
//                 products: result.data
//               });
// 			  console.log(this.state.products)
//         })
//       }
// 	render() {
// 		let options = this.state.products.map(v => (
// 			<option value={v.id}>{v.name}</option>
// 		  ));
// 		return (
// 			<div>
// 				<div class="limiter">
// 					<div class="container-login100">
// 						<div class="wrap-login100">
// 							<form
// 								class="login100-form validate-form"
// 								onSubmit={this.handleSubmit}
// 							>
// 								<span class="login100-form-title">
// 									Add Bill
// 								</span>
// 								<div
// 									class="wrap-input100 validate-input"
// 								>
// 								<select name="name" value={this.state.name} onChange={this.handleInputChange}>
// 								<option>Select</option>
// 									{options}
// 								</select>
// 								</div>
// 								<div
// 									class="wrap-input100 validate-input"
// 								>
// 									<input
// 										class="input100"
// 										type="number"
// 										name="quantity"
// 										placeholder="Quantity"
// 										onChange={this.handleInputChange}
// 										value={this.state.quantity}
// 									/>
// 									<span class="focus-input100"></span>
// 									<span class="symbol-input100">
// 										<i
// 											class="fa fa-lock"
// 											aria-hidden="true"
// 										></i>
// 									</span>
// 								</div>
// 								<div
// 									class="wrap-input100 validate-input"
// 								>
// 									<input
// 										class="input100"
// 										type="number"
// 										name="hsn_no"
// 										placeholder="HSN NO."
// 										onChange={this.handleInputChange}
// 										value={this.state.hsn_no}
// 									/>
// 									<span class="focus-input100"></span>
// 									<span class="symbol-input100">
// 										<i
// 											class="fa fa-lock"
// 											aria-hidden="true"
// 										></i>
// 									</span>
// 								</div>
//                                 <div
// 									class="wrap-input100 validate-input"
// 								>
// 								{this.changer}
// 									<input
// 										class="input100"
// 										type="number"
//                                         step="0.01"
// 										name="price"
// 										placeholder="Price"
// 										onChange={this.handleInputChange}
// 										value={this.state.price}
// 									/>
// 									<span class="focus-input100"></span>
// 									<span class="symbol-input100">
// 										<i
// 											class="fa fa-lock"
// 											aria-hidden="true"
// 										></i>
// 									</span>
// 								</div>
// 								<div class="container-login100-form-btn">
// 									<button class="login100-form-btn">
// 										Add
// 									</button>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default Addbill;

import "./Addbill.css";
import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import {saveAs} from 'file-saver';
class Addbill extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			billnumber: Math.floor(Math.random() * 1001),
			customer_name: "",
			date_of_supply: "",
			place_of_supply: "",
			transporter_info: "",
			gst_no: "",
			billing_address: "",
			billValues: [{ product_name: "", quantity: "", amount: "", hsn_code: "" }],
			products: [],
			customers: [],
			values: this.props.location.state,
		};
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		for (let i = 0; i < this.state.customers.length; i++) {
			if (this.state.customers[i].cust_name == this.state.customer_name) {
				this.setState({
					gst_no: this.state.customers[i].gst_no,
					billing_address: this.state.customers[i].billing_address,
				});
			}
		}
	};
	handleInputChange = (i, e) => {
		let billValues = this.state.billValues;
		billValues[i][e.target.name] = e.target.value;
		this.setState({ billValues });
		for (let i = 0; i < this.state.products.length; i++) {
			for (let j = 0; j < this.state.billValues.length; j++) {
				console.log(
					this.state.products[i].name,
					this.state.billValues[j].product_name
				);
				if (this.state.products[i].name == this.state.billValues[j].product_name) {
					var amount = this.state.products[i].price * Number(this.state.billValues[j].quantity);
					this.state.billValues[j].amount = amount;
					this.state.billValues[j].hsn_code=this.state.products[i].hsn_code;
					// if(this.state.quantity!="")
					// {
					this.setState({
						billValues,
						// this.state.billValues: "",
						// price: this.state.products[i].price*Number(this.state.quantity)
					});
					// }
				}
			}
		}
	};
	addFormFields() {
		this.setState({
			billValues: [
				...this.state.billValues,
				{ product_name: "", quantity: "", amount: "", hsn_code:"" },
			],
		});
	}

	removeFormFields(i) {
		let billValues = this.state.billValues;
		billValues.splice(i, 1);
		this.setState({ billValues });
	}
	handleSubmit = (e) => {
		e.preventDefault();

		const {
			billnumber,
			customer_name,
			date_of_supply,
			place_of_supply,
			transporter_info,
			gst_no,
			billing_address,
			billValues,
		} = this.state;

		const bill = {
			billnumber,
			customer_name,
			date_of_supply,
			place_of_supply,
			transporter_info,
			gst_no,
			billing_address,
			billValues,
		};
		this.setState({
			billValues: [...this.state.billValues],
		});
		axios.post("http://localhost:5000/email",this.state)
		axios
			.post("http://localhost:5000/addbill", bill)
			.then((result) => {
				console.log(result.data);
				if (result.data === "Success") {
					this.props.history.push({
						pathname: "/show",
						state: this.state.values,
					});
				} else {
					alert("You have enetered something wrong!!!");
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};
	componentDidMount() {
		axios.get("http://localhost:5000/fetch_products").then((result) => {
			this.setState({
				products: result.data,
			});
			console.log(this.state.products);
		});
		axios.get("http://localhost:5000/fetch_customers").then((result) => {
			this.setState({
				customers: result.data,
			});
			console.log(this.state.customers);
		});
	}
	render() {
		let options = this.state.products.map((v) => (
			<option value={v.id}>{v.name}</option>
		));
		let customer_options = this.state.customers.map((v) => (
			<option value={v.id} style={{ color: "black" }}>
				{v.cust_name}
			</option>
		));
		return (
			<div>
				<div class="limiter">
					<div class="container-login100">
						<div class="wrap-login100">
							<form onSubmit={this.handleSubmit}>
								<span class="login100-form-title">
									Add Bill
								</span>
								<div>
									<p>Bill Number : {this.state.billnumber}</p>
								</div>
								<select
									name="customer_name"
									value={this.state.customer_name}
									onChange={this.handleChange}
								>
									<option>Select</option>
									{customer_options}
								</select>
								<input
									type="date"
									name="date_of_supply"
									value={this.state.date_of_supply}
									onChange={this.handleChange}
								/>
								<br />
								GST NO :{" "}
								<input
									type="text"
									name="gst_no"
									value={this.state.gst_no}
									onChange={this.handleChange}
								/>
								<br />
								Billing Address :{" "}
								<input
									type="text"
									name="billing_address"
									value={this.state.billing_address}
									onChange={this.handleChange}
								/>
								<br />
								<input
									class="input100"
									type="text"
									name="place_of_supply"
									placeholder="Place of supply"
									onChange={this.handleChange}
									value={this.state.place_of_supply}
								/>
								<input
									class="input100"
									type="text"
									name="transporter_info"
									placeholder="Transporter info"
									onChange={this.handleChange}
									value={this.state.transporter_info}
								/>
								{this.state.billValues.map((element, index) => (
									<div className="form-inline" key={index}>
										<select
											name="product_name"
											value={element.product_name || ""}
											onChange={(e) =>
												this.handleInputChange(index, e)
											}
										>
											<option>Select</option>
											{options}
										</select>
										<input
											class="input100"
											type="number"
											name="quantity"
											placeholder="Quantity"
											onChange={(e) =>
												this.handleInputChange(index, e)
											}
											value={element.quantity || ""}
										/>
										<input
											class="input100"
											type="number"
											step="0.01"
											name="amount"
											placeholder="Amount"
											onChange={(e) =>
												this.handleInputChange(index, e)
											}
											value={element.amount || ""}
										/>
										{index ? (
											<button
												type="button"
												className="button remove"
												onClick={() =>
													this.removeFormFields(index)
												}
											>
												Remove
											</button>
										) : null}
									</div>
								))}
								<div className="button-section">
									<button
										className="button add-bu"
										type="button"
										onClick={() => this.addFormFields()}
									>
										Add
									</button>
									<button
										className="button submit"
										type="submit"
									>
										Add Bill
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Addbill;
