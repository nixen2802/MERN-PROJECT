import "./Login.css";
import {Link} from 'react-router-dom';
import React, { Component } from "react";
import axios from "axios";
import img_logo from "./images/img-01.png";
class Register extends Component {
	constructor(props) {
		super(props);
		// this.handleInputChange=this.handleSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			email: "",
			password: "",
		};
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { email, password } = this.state;

		const user = {
			email,
			password,
		};
		axios
			.post("http://localhost:5000/login", user)
			.then((result) => {
				console.log(result.data);
				if (result.data === "Success") {
					this.props.history.push({
						pathname: "/show",
						state: {
							email: email,
							password: password,
						},
					});
				} else {
					alert("You have enetered something wrong!!!");
				}
			})
			.catch((err) => {
				console.error(err);
			});
		this.setState({
			email: "",
			password: "",
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
								<span class="login100-form-title">Login</span>
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
								<div class="container-login100-form-btn">
									<button class="login100-form-btn">
										Login
									</button>
								</div>
								<div
									class="text-center"
									style={{ paddingTop: "136px" }}
								>
								<Link to={'/register'}>
								Create your Account
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
