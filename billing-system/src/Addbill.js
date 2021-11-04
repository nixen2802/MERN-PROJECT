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
// 			values: this.props.location.state
// 		};
// 	}

// 	handleInputChange = (e) => {
// 		this.setState({
// 			[e.target.name]: e.target.value,
// 		});
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
//             price: ""
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

// 	render() {
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
// 								<select name="selectList" id="selectList">
// 								  <option value="option 1">Option 1</option>
// 								  <option value="option 2">Option 2</option>
// 								</select>
// 									<input
// 										class="input100"
// 										type="text"
// 										name="name"
// 										placeholder="Product Name"
// 										onChange={this.handleInputChange}
// 										value={this.state.name}
// 									/>
// 									<span class="focus-input100"></span>
// 									<span class="symbol-input100">
// 										<i
// 											class="fa fa-envelope"
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





import './Addbill.css';
import React, { Component } from "react";
import axios from "axios";
class Addbill extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			name: "",
			quantity: "",
			hsn_no: "",
            price: "",
			products: [],
			values: this.props.location.state
		};
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		for(let i=0;i<this.state.products.length;i++)
		{
			if(this.state.products[i].name===this.state.name)
			{
				// if(this.state.quantity!="")
				// {
					this.setState({
						price: this.state.products[i].price*Number(this.state.quantity)
					})
				// }
			}
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { name, quantity, hsn_no, price } = this.state;

		const bill = {
			name, quantity, hsn_no, price
		};
		this.setState({
			name: "", 
            quantity: "", 
            hsn_no: "", 
            price: "",
		});
		axios
			.post("http://localhost:5000/addbill", bill)
			.then((result) => {
				console.log(result.data);
				if (result.data === "Success") {
					this.props.history.push({
						pathname: '/show',
						state: this.state.values
					  })
				} else {
					alert("You have enetered something wrong!!!");
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};
	componentDidMount() {
        axios.get('http://localhost:5000/fetch_products').then((result)=>{
            this.setState({
                products: result.data
              });
			  console.log(this.state.products)
        })
      }
	render() {
		let options = this.state.products.map(v => (
			<option value={v.id}>{v.name}</option>
		  ));
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
									Add Bill
								</span>
								<div
									class="wrap-input100 validate-input"
								>
								<select name="name" value={this.state.name} onChange={this.handleInputChange}>
								<option>Select</option>
									{options}
								</select>
								</div>
								<div
									class="wrap-input100 validate-input"
								>
									<input
										class="input100"
										type="number"
										name="quantity"
										placeholder="Quantity"
										onChange={this.handleInputChange}
										value={this.state.quantity}
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
										type="number"
										name="hsn_no"
										placeholder="HSN NO."
										onChange={this.handleInputChange}
										value={this.state.hsn_no}
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
								{this.changer}
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Addbill;

