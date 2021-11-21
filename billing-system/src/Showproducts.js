import "./Showproducts.css";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
export default class Detials extends React.Component {
	constructor(props) {
		super(props);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.state = {
			value: this.props.location.state,
			prodid: "",
			products: [],
		};
	}
	deleteProduct(prod_id) {
		this.setState({
			prodid: prod_id,
		});

		const { prodid } = this.state;
		const product = { main_id: prod_id };
		axios
			.post("http://localhost:5000/delete_product", product)
			.then((result) => {
				if (result.data == "Success") {
					alert("Product deleted successfully");
					window.location = "http://localhost:3000/showproducts";
				}
			});
	}
	componentDidMount() {
		axios.get("http://localhost:5000/fetch_products").then((result) => {
			this.setState({
				products: result.data,
			});
		});
	}
	render() {
		const values = this.state.value;
		const product = this.state.products.map((product) => (
			<div
				className="col-xl-4 col-lg-6 col-md-6 col-xl-3"
				key={product._id}
			>
				<div class="card customShadow" style={{ marginTop: "15px" }}>
					<div class="card-header">Name : {product.name}</div>
					<div class="card-body">
						<h5 class="card-title">Rs. {product.price}</h5>
						<div class="billDetails">
							<div className="billDetailTags">
								<p>Item Code: </p>
								<p>HSN Code: </p>
							</div>
							<div className="billDetailsValues">
								<p>{product.item_code}</p>
								<p>{product.hsn_code}</p>
							</div>
						</div>
					</div>
					<div class="card-footer">
						<Link
							to={{
								pathname: `/updateproduct/${product._id}`,
								state: {
									value: this.state.value,
									product: product,
								},
							}}
							className="btn btn-outline-primary"
						>
							Update Product
						</Link>
						<button
							class="btn-outline-danger btn"
							style={{ fontSize: "14px" }}
							onClick={() => this.deleteProduct(product._id)}
						>
							Delete Product
						</button>
					</div>
				</div>
			</div>
		));

		function renderViewProductsButton() {
			if (values.email === "nayanmandaliya01@gmail.com") {
				return (
					<li>
						<Link
							to={{
								pathname: "/showproducts",
								state: values, // your data array of objects
							}}
							style={{ color: "black", borderBottom: "2px solid #f6b024" }}
						>
							View Products
						</Link>
					</li>
				);
			}
			return null;
		};
		function renderViewCustomersButton() {
			if (values.email === "nayanmandaliya01@gmail.com") {
				return (
					<li>
						<Link
							to={{
								pathname: "/showcustomer",
								state: values, // your data array of objects
							}}
							style={{ color: "black" }}
						>
							View Customers
						</Link>
					</li>
				);
			}
			return null;
		};

		function renderAddProductsButton() {
			return (
				<li>
					<Link
						to={{
							pathname: "/addproducts",
							// state: this.state.value,
						}}
						style={{ color: "black" }}
					// className="btn btn-outline-secondary"
					>
						Add Products
					</Link>
				</li>
			)
		}

		return (
			<div>
				<div style={{ background: "rgba(0, 0, 0, 0.1)", position: "absolute" }} id="header" class="fixed-top d-flex align-items-center">
					<div
						class="
						container
						d-flex
						align-items-center
						justify-content-between
					"
					>
						<h1 class="logo">
							<a style={{ color: "black" }} href="#">
								HRN
							</a>
						</h1>

						<nav id="navbar" class="navbar">
							<ul>
								<li>
									<Link
										to={{
											pathname: "/addbill",
											state: this.state.value,
										}}
										style={{ color: "black" }}
										class="nav-link scrollto"
										href="#hero"
									>
										Add bill
									</Link>
								</li>
								{renderAddProductsButton()}
								{renderViewProductsButton()}
								{renderViewCustomersButton()}
								<li>
									<Link
										to={"/"}
										style={{ color: "black" }}
										class="nav-link scrollto"
										href="#about"
									>
										Logout
									</Link>
								</li>
							</ul>
							<i class="bi bi-list mobile-nav-toggle"></i>
						</nav>
					</div>
				</div>
				<div className="container">
					<div className="row row-content" style={{ margin: "0px", marginTop: "100px" }}>{product}</div>
					<div>
						{/* <Link
							to={{
								pathname: "/addproducts",
								state: this.state.value,
							}}
							className="btn btn-outline-secondary"
							style={{
								marginTop: "20px",
								marginRight: "10px",
								marginLeft: "20px",
							}}
						>
							Add Product
						</Link> */}
						<Link
							className="btn btn-outline-secondary"
							to={{ pathname: "/show", state: this.state.value }}
							style={{ marginTop: "20px", marginLeft: "15px" }}
						>
							Back to bills
						</Link>
					</div>
				</div>
				<div>
					<br />
					<br />
					<br />
					<footer style={{ background: "rgba(0, 0, 0, 0.1)" }} id="footer">
						<div class="container" id="contact">
							<div style={{ color: "black" }} class="copyright">
								&copy; Copyright{" "}
								<strong>
									<span>HSN</span>
								</strong>
								. All Rights Reserved
							</div>
							<div style={{ color: "black" }} class="credits">
								Designed by
								<a href="#"> Rushabh, Nayan, Hussein</a>
							</div>
						</div>
					</footer>
					<br />
				</div>
			</div>
		);
	}
}
