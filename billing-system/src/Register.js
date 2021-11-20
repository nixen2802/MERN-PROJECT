import "./Register.css";
import React, { Component } from "react";
import axios from "axios";
import img_logo from "./images/img-01.png";
import { Link } from "react-router-dom";
class Register extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			email: "",
			password: "",
			conpassword: "",
		};
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { email, password, conpassword } = this.state;

		const user = {
			email,
			password,
			conpassword,
		};
		this.setState({
			email: "",
			password: "",
			conpassword: "",
		});
		axios
			.post("http://localhost:5000/register", user)
			.then((result) => {
				console.log(result.data);
				if (result.data === "Success") {
					alert("Registration successfull!!!");
					this.props.history.push("/login");
				} 
				else if(result.data==="Empty")
				{
					alert("Email or password can't be empty!!!");
				}
				else if(result.data==="Invalid")
				{
					alert("Please enter a valid email!!!");
				}
				else if(result.data==="Exists")
				{
					alert("Email already exists!!!");
				}
				else if(result.data=="Short")
				{
					alert("Length of password must be greater than 6");
				}
				else {
					alert("Enter passwords correctly!!!");
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	render() {
		return (
			<div>
				<div class="limiter">
					<div class="container-login100">
						<div class="wrap-login100">
							<div class="login100-pic js-tilt" data-tilt="">
								<img src={img_logo} alt="IMG" />
							</div>
							<form
								class="login100-form validate-form"
								onSubmit={this.handleSubmit}
							>
								<span class="login100-form-title">
									Register
								</span>
								<div
									class="wrap-input100 validate-input"
									data-validate="Valid email is required: ex@abc.xyz"
								>
									<input
										class="input100"
										type="email"
										name="email"
										placeholder="Email"
										onChange={this.handleInputChange}
										value={this.state.email}
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
									data-validate="Password is required"
								>
									<input
										class="input100"
										type="password"
										name="password"
										placeholder="Password"
										onChange={this.handleInputChange}
										value={this.state.password}
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
									data-validate="Password is required"
								>
									<input
										class="input100"
										type="password"
										name="conpassword"
										placeholder="Confirm Password"
										onChange={this.handleInputChange}
										value={this.state.conpassword}
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
										Register
									</button>
								</div>
								<div
									class="text-center"
									style={{ paddingTop: "136px" }}
								>
									<Link
										to={"/login"}
										class="txt2"
										href="#"
										style={{ textDecoration: "none" }}
									>
										Already have an account? Login
										<i
											class="fa fa-long-arrow-right m-l-5"
											aria-hidden="true"
											style={{ paddingLeft: "10px" }}
										></i>
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
