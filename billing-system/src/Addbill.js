import "./Addbill.css";
import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
class Addbill extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.cancel=this.cancel.bind(this);
		this.state = {
			// billnumber: Math.floor(Math.random() * 1001),
			billnumber: 0,
			customer_name: "",
			date_of_supply: "",
			place_of_supply: "",
			transporter_info: "",
			gst_no: "",
			billing_address: "",
			email: "",
			billValues: [
				{ product_name: "", quantity: "", amount: "", hsn_code: "" },
			],
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
					email: this.state.customers[i].email
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
				if (
					this.state.products[i].name ==
					this.state.billValues[j].product_name
				) {
					var amount =
						this.state.products[i].price *
						Number(this.state.billValues[j].quantity);
					this.state.billValues[j].amount = amount;
					this.state.billValues[j].hsn_code =
						this.state.products[i].hsn_code;
					// if(this.state.quantity!="")
					// {
					this.setState({
						billValues
						// this.state.billValues: "",
						// price: this.state.products[i].price*Number(this.state.quantity)
					});
					console.log("Temp : ",this.state.billValues)
					// }
				}
			}
		}
	};
	addFormFields() {
		this.setState({
			billValues: [
				...this.state.billValues,
				{ product_name: "", quantity: "", amount: "", hsn_code: "" },
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
			email,
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
			email,
			billValues,
		};
		this.setState({
			billValues: [...this.state.billValues],
		});
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
		axios.get("http://localhost:5000/fetch").then((result)=>{
			if(result.data.length==0)
			{
				this.setState({
					billnumber: 1,
				})
			}
			else
			{
				this.setState({
					billnumber: Number(result.data[result.data.length-1].billnumber)+1,
				})
			}
			console.log(result.data[result.data.length-1])
		})
	}
	cancel(){
		this.props.history.push({
			pathname: '/show',
			  state: this.state.values // your data array of objects
		  })
	}
	render() {
		let total=0;
		let gst_cal=0;
		for(let i=0;i<this.state.billValues.length;i++)
		{
			total=total+Number(this.state.billValues[i].amount);
		}
		gst_cal=total*0.18;
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
									<h6 style={{ marginBottom: "10px" }}>
										Bill Number : {this.state.billnumber}
									</h6>
								</div>
								<label>Customer Name:</label>
								<select
									className="input100"
									style={{ border: "none" }}
									name="customer_name"
									value={this.state.customer_name}
									onChange={this.handleChange}
								>
									<option>Select</option>
									{customer_options}
								</select>
								<label>Date of supply:</label>
								<input
									className="input100"
									type="date"
									name="date_of_supply"
									value={this.state.date_of_supply}
									onChange={this.handleChange}
								/>
								<br />
								<div className="address">
									<label htmlFor="gst_no">GST NO :</label>
									<input
										className="input100"
										type="text"
										name="gst_no"
										value={this.state.gst_no}
										onChange={this.handleChange}
									/>
								</div>
								<br />
								<div className="address">
									<label htmlFor="billing_address">
										Billing Address :{" "}
									</label>
									<input
										type="text"
										className="input100"
										name="billing_address"
										value={this.state.billing_address}
										onChange={this.handleChange}
									/>
								</div>
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
									<label>Product:</label>
										<select
											className="input100"
											style={{ border: "none" }}
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
												className="remove btn btn-danger"
												onClick={() =>
													this.removeFormFields(index)
												}
											>
												Remove
											</button>
										) : null}
									</div>
								))}
								<div>
									Total Amount : {total}
									GST (18%) : {gst_cal}
								</div>
								<div className="button-section">
									<button
										className="button add-bu login100-form-btn"
										type="button"
										style={{ marginRight: "10px" }}
										onClick={() => this.addFormFields()}
									>
										Add
									</button>
									<button
										className="button submit login100-form-btn"
										type="submit"
									>
										Add Bill
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

export default Addbill;
