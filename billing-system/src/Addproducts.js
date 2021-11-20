import './Addproducts.css';
import React, { Component } from "react";
import axios from "axios";
class Addproduct extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.cancel=this.cancel.bind(this);
		this.state = {
			value:this.props.location.state,
			name: "",
			item_code: Math.floor(Math.random() * (10000001)),
			price: "",
			hsn_code: ""
		};
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { name, item_code, price, hsn_code } = this.state;

		const product = {
			name, item_code, price, hsn_code 
		};
		this.setState({
			name: "",
			item_code: "",
            price: "",
			hsn_code: ""
		});
		axios
			.post("http://localhost:5000/addproducts", product)
			.then((result) => {
				console.log(result.data);
				if (result.data === "Success") {
					this.props.history.push({
						pathname: '/showproducts',
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
			pathname: '/showproducts',
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
									Add Product
								</span>
								<div>
									<p>Item Code : {this.state.item_code}</p>
								</div>
								<div
									class="wrap-input100 validate-input"
								>
									<input
										class="input100"
										type="text"
										name="name"
										placeholder="Product Name"
										onChange={this.handleInputChange}
										value={this.state.name}
									/>
									<span class="focus-input100"></span>
									<span class="symbol-input100">
										<i
											class="fa fa-envelope"
											aria-hidden="true"
										></i>
									</span>
								</div>
								<div>
								<input
										class="input100"
										type="number"
										name="hsn_code"
										placeholder="HSN NO"
										onChange={this.handleInputChange}
										value={this.state.hsn_code}
									/>
								</div>
                                <div
									class="wrap-input100 validate-input"
								>
									<input
										class="input100"
										type="number"
                                        step="0.01"
										name="price"
										placeholder="Price"
										onChange={this.handleInputChange}
										value={this.state.price}
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

export default Addproduct;
