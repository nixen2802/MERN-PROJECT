import "./Login.css";
import React, { Component } from "react";
import axios from "axios";
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
				<br />
				<div className="container">
					<form onSubmit={this.handleSubmit}>
						<div style={{ width: "30%" }} className="form-group">
							<input
								type="text"
								className="form-control"
								name="email"
								placeholder="Email"
								onChange={this.handleInputChange}
								value={this.state.email}
							/>
						</div>
						<br />
						<div style={{ width: "30%" }} className="form-group">
							<input
								type="text"
								className="form-control"
								name="password"
								placeholder="Password"
								onChange={this.handleInputChange}
								value={this.state.password}
							/>
						</div>
						<br />
						<div style={{ width: "30%" }}>
							<button className="btn btn-success" type="submit">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
