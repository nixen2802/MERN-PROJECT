import './Updateproduct.css';
import React, { Component } from "react";
import axios from "axios";
class Updateproduct extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
            id: this.props.match.params.id,
			value:this.props.location.state,
            name: this.props.location.state.product.name,
            item_code: this.props.location.state.product.item_code,
            price: this.props.location.state.product.price,
            hsn_code: this.props.location.state.product.hsn_code
		};
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { id, name, item_code, price, hsn_code } = this.state;

		const product = {
			id, name, item_code, price, hsn_code
		};
		this.setState({
			id: "", 
            name: "", 
            item_code: "", 
            price: "", 
            hsn_code: ""
		});
        console.log(product);
		axios
			.post("http://localhost:5000/updateproduct", product)
			.then((result) => {
				console.log(result.data);
				if (result.data === "Success") {
                    alert("Data Successfully updated")
					this.props.history.push({
						pathname: '/showproducts',
						  state: this.state.value.value // your data array of objects
					  })
				} else {
					alert("You have enetered something wrong!!!");
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};
    componentDidMount(){
        axios.get('http://localhost:5000/fetch_individual_product', {params: { id: this.state.id },
        }).then((result)=>{
            console.log(result.data)
            this.setState({
                id: result.data[0]._id, 
                name: result.data[0].name, 
                item_code: result.data[0].item_code, 
                price: result.data[0].price,
                hsn_code: result.data[0].hsn_code
            })
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
									Update Product
								</span>
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
                                <div
									class="wrap-input100 validate-input"
								>
									<input
										class="input100"
										type="number"
										name="hsn_code"
										placeholder="HSN Code"
										onChange={this.handleInputChange}
										value={this.state.hsn_code}
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
										Update
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

export default Updateproduct;
