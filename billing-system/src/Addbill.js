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

import './Addbill.css';
import React, { Component } from "react";
import axios from "axios";
class Addbill extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			billValues: [{name: "",
			quantity: "",
			hsn_no: "",
            price: "",}],
			products: [],
			values: this.props.location.state,
			billnumber: Math.floor(Math.random() * (1001)),
			company_name: ""
		};
	}
	handleChange = (e) => {
				this.setState({
					[e.target.name]: e.target.value,
				});
			}
	handleInputChange = (i, e) => {
		let billValues = this.state.billValues;
		billValues[i][e.target.name] = e.target.value;
		this.setState({ billValues });
		for(let i=0;i<this.state.products.length;i++)
		{
			for(let j=0;j<this.state.billValues.length;j++)
			{
				if(this.state.products[i].name===this.state.billValues[j].name)
				{
					var price= this.state.products[i].price*Number(this.state.billValues[j].quantity);
					this.state.billValues[j].price=price;
					// if(this.state.quantity!="")
					// {
						this.setState({
							billValues 
							// this.state.billValues: "",
							// price: this.state.products[i].price*Number(this.state.quantity)
						})
					// }
				}
			}
		}
	};
	addFormFields() {
		this.setState(({
		  billValues: [...this.state.billValues, {name: "",
		  quantity: "",
		  hsn_no: "",
		  price: "",}]
		}))
	  }
	
	  removeFormFields(i) {
		let billValues = this.state.billValues;
		billValues.splice(i, 1);
		this.setState({ billValues });
	  }
	handleSubmit = (e) => {
		e.preventDefault();

		const { billValues,billnumber, company_name } = this.state;

		const bill = {
			billValues, billnumber, company_name
		};
		this.setState({
			billValues: [...this.state.billValues]
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
						<form  onSubmit={this.handleSubmit}>
							<span class="login100-form-title">
								Add Bill
							</span>
							<div>
								<p>Bill Number : {this.state.billnumber}</p>
							</div>
							<input
								class="input100"
								type="text"
								name="company_name"
								placeholder="Company Name"
								onChange={this.handleChange}
								value={this.state.company_name}
							/>
							{this.state.billValues.map((element, index) => (
								<div className="form-inline" key={index}>
									<select name="name" value={element.name || ""} onChange={e=>this.handleInputChange(index,e)}>
									<option>Select</option>
										{options}
									</select>
									<input
										class="input100"
										type="number"
										name="quantity"
										placeholder="Quantity"
										onChange={e=>this.handleInputChange(index,e)}
										value={element.quantity || ""}
									/>
									<input
										class="input100"
										type="number"
										name="hsn_no"
										placeholder="HSN NO."
										onChange={e=>this.handleInputChange(index,e)}
										value={element.hsn_no || ""}
									/>
									<input
										class="input100"
										type="number"
                                        step="0.01"
										name="price"
										placeholder="Price"
										onChange={e=>this.handleInputChange(index,e)}
										value={element.price || ""}
									/>
									{
										index ? 
										<button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
										: null
									}

								</div>
							))}
							<div className="button-section">
								<button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
								<button className="button submit" type="submit">Add Bill</button>
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
