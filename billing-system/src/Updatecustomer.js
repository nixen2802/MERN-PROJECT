import './Updatecustomer.css';
import React, { Component } from "react";
import axios from "axios";
class Updatecustomer extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props.match.params.id);
		this.state = {
            id: this.props.match.params.id,
			value:this.props.location.state,
			cust_name: this.props.location.state.customer.cust_name,
			gst_no: this.props.location.state.customer.gst_no,
			billing_address: this.props.location.state.customer.billing_address
		};
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { id, cust_name, gst_no, billing_address } = this.state;

		const customer = {
			id, cust_name, gst_no, billing_address 
		};
		this.setState({
			cust_name: "",
			gst_no: "",
			billing_address: ""
		});
        console.log("Customer : ",customer)
		axios
			.post("http://localhost:5000/updatecustomer", customer)
			.then((result) => {
				console.log(result.data);
				if (result.data === "Success") {
                    alert("Data Successfully updated")
					this.props.history.push({
						pathname: '/showcustomer',
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
        axios.get('http://localhost:5000/fetch_individual_customer', {params: { id: this.state.id },
        }).then((result)=>{
            console.log(result.data)
            this.setState({
                id: result.data[0]._id,
                cust_name: result.data[0].cust_name,
                gst_no: result.data[0].gst_no,
                billing_address: result.data[0].billing_address
            })
            console.log("This state",this.state)
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
									Update Customer
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

export default Updatecustomer;
