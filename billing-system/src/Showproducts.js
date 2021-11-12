import "./Showproducts.css";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
export default class Detials extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.location.state,
			products: [],
		};
	}
	componentDidMount() {
		axios.get("http://localhost:5000/fetch_products").then((result) => {
			this.setState({
				products: result.data,
			});
		});
	}
	render() {
		const product = this.state.products.map((product) => (
			// <div style={{ border: "1px solid black" }} key={product._id}>
			//   <h3>{product.name}</h3>
			//   <p>{product.price}</p>
			//   <p>Item Code: {product.item_code}</p>
			//   <p>HSN Code: {product.hsn_code}</p>
			//   <Link to={{pathname: `/updateproduct/${product._id}`, state: {value: this.state.value, product: product}}}>
			//         <h1>Update Product</h1>
			//     </Link>
			// </div>
			<div
				className="col-xl-6 col-lg-6 col-md-12 col-xl-3"
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
					</div>
				</div>
			</div>
		));

		return (
			<div>
				{product}
				<div>
					<Link
						to={{
							pathname: "/addproducts",
							state: this.state.value,
						}}
					>
						Add Product
					</Link>
					<Link to={{ pathname: "/show", state: this.state.value }}>
						Back to bills
					</Link>
				</div>
			</div>
		);
	}
}
