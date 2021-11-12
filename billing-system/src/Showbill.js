// import { useParams } from 'react-router';
// import './Showbill.css';
// function Showbill(){
//     const {id}=useParams();
//     console.log(id);
//     return(
//         <div>
//             This is the show bills page!!!
//         </div>
//     )
// }
// export default Showbill;

import "./Showbill.css";
import { Link, useParams, withRouter } from "react-router-dom";
import React from "react";
import axios from "axios";
import number_to_word from "number-to-words";
class Showbill extends React.Component {
	constructor(props) {
		super(props);
		this.print = this.print.bind(this);
		this.state = {
			billnumber: this.props.match.params.id,
			value: this.props.location.state,
			bills: [],
			bill_details: [],
			total_amount: 0,
			gst_value: 0,
			year: new Date().getFullYear(),
			customer_name: "",
			date_of_supply: Date(),
			gst_amount: 0,
			place_of_supply: "",
			transporter_info: "",
			gst_no: 0,
			billing_address: "",
			sgst_amount: 0,
			cgst_amount: 0,
			igst_amount: 0,
		};
	}
	componentDidMount() {
		axios
			.get("http://localhost:5000/fetch_bills", {
				params: { id: this.state.billnumber },
			})
			.then((result) => {
				// console.log(result.data);
				this.setState({
					bills: result.data,
				});
				// console.log(this.state.bills[0]);
			});
		axios
			.get("http://localhost:5000/fetch_bill_details", {
				params: { id: this.state.billnumber },
			})
			.then((result) => {
				this.setState({
					bill_details: result.data,
				});
				this.setState({
					total_amount: this.state.bill_details[0].total_amount,
					customer_name: this.state.bill_details[0].customer_name,
					date_of_supply: this.state.bill_details[0].date_of_supply,
					gst: this.state.bill_details[0].gst,
					place_of_supply: this.state.bill_details[0].place_of_supply,
					transporter_info:
						this.state.bill_details[0].transporter_info,
					gst_no: this.state.bill_details[0].gst_no,
					billing_address: this.state.bill_details[0].billing_address,
					sgst_amount: this.state.bill_details[0].total_amount * 0.09,
					cgst_amount: this.state.bill_details[0].total_amount * 0.09,
					igst_amount: this.state.bill_details[0].total_amount * 0.18,
				});
			});
	}

	print() {
		window.print();
	}
	render() {
		const values = this.state.value;
		const billdetails = this.state.bill_details.map((bill) => (
			<div key={bill._id}>
				<div className="card-header">
					Bill Number : {bill.billnumber}
				</div>
				<div className="card-body">
					<h5 className="card-title" style={{ marginBottom: "6%" }}>
						{bill.company_name}
					</h5>
					<div class="billdetails">
						<div className="billDetailTags">
							<p>Customer Name : </p>
							<p>Date Of Supply : </p>
							<p>Total Amount : </p>
							<p>GST : </p>
							<p>Place Of Supply : </p>
							<p>Transporter Info : </p>
							<p>GST NO : </p>
							<p>Billing address : </p>
						</div>
						<div className="billDetailsValues">
							<p>{bill.customer_name}</p>
							<p>{bill.date_of_supply}</p>
							<p>{bill.total_amount}</p>
							<p>{bill.gst}</p>
							<p>{bill.place_of_supply}</p>
							<p>{bill.transporter_info}</p>
							<p>{bill.gst_no}</p>
							<p>{bill.billing_address}</p>
							<p>{this.state.date}</p>
							<p>{this.state.year}</p>
						</div>
					</div>
				</div>
			</div>
		));
		var count = 1;
		const bill = this.state.bills.map((bill) => (
			<tr key={bill._id}>
				<td style={{ width: "5%" }}>
					<span contentEditable>{count++}</span>
				</td>
				<td style={{ width: "50%" }}>
					<span contentEditable>{bill.product_name}</span>
				</td>
				<td style={{ width: "8%" }}>
					<span contentEditable>:hsn_code</span>
				</td>
				<td style={{ width: "8%" }}>
					<span contentEditable>{bill.quantity}</span>
				</td>
				<td>
					<span contentEditable>{bill.amount / bill.quantity}</span>
				</td>
				<td>
					<span contentEditable>Each</span>
				</td>
				<td>
					<span contentEditable>Rs.{bill.amount}</span>
				</td>
			</tr>
			// <div className="row row-content" key={bill._id}>
			// 	<div
			// 		class="placement
			// 			col-lg-4
			// 			col-md-4
			// 			col-sm-4
			// 			billItems
			// 		"
			// 	>
			// 		{bill.product_name}
			// 	</div>
			// 	<div
			// 		class="placement
			// 			col-lg-4
			// 			col-md-4
			// 			col-sm-4
			// 			"
			// 	>
			// 		{bill.quantity}
			// 	</div>
			// 	<div
			// 		class="placement
			// 			col-lg-4
			// 			col-md-4
			// 			col-sm-4
			// 		"
			// 	>
			// 		{bill.amount}
			// 	</div>
			// </div>
		));

		return (
			// <div className="container" style={{ marginTop: "8%" }}>
			// 	<div className="row row-content">
			// 		<div className="col-12">
			// 			<h1 style={{ textAlign: "center", marginBottom: "2%" }}>
			// 				Final Bill
			// 			</h1>
			// 			<div className="mainBill">
			// 				<div
			// 					className="customShadow card customCard"
			// 					style={{ borderRadius: "6px" }}
			// 				>
			// 					{billdetails}
			// 					<div class="row row-content">
			// 						<div class="col-lg-4 col-md-4 col-sm-4 placement">
			// 							<h4>Item</h4>
			// 						</div>
			// 						<div class="col-lg-4 col-md-4 col-sm-4 placement">
			// 							<h4>Quantity</h4>
			// 						</div>
			// 						<div class="col-lg-4 col-md-4 col-sm-4 placement">
			// 							<h4>Price</h4>
			// 						</div>
			// 					</div>
			// 					<hr />
			// 					<div className="row row-content">{bill}</div>
			// 					<hr />
			// 					<div>
			// 						Total:{" "}
			// 						{this.state.total_amount -
			// 							this.state.gst_value}
			// 						<br />
			// 						GST : {this.state.gst_value}
			// 					</div>
			// 					<div class="row row-content">
			// 						<div
			// 							class="
			// 							placement
			// 									col-lg-4
			// 									col-md-4
			// 									col-sm-4
			// 									col-xs-4
			// 								"
			// 						>
			// 							TOTAL
			// 						</div>
			// 						<div
			// 							class="
			// 							placement
			// 									col-lg-4
			// 									col-md-4
			// 									col-sm-4
			// 									col-xs-4
			// 								"
			// 							style={{ marginLeft: "31%" }}
			// 						>
			// 							{this.state.total_amount}
			// 						</div>
			// 					</div>
			// 					<div class="card-footer"></div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	</div>
			// 	<div>
			// 		<Link
			// 			to={{
			// 				pathname: "/show",
			// 				state: values,
			// 			}}
			// 			className="btn btn-outline-secondary"
			// 			style={{
			// 				// backgroundColor: "#fcf93c",
			// 				marginTop: "15px",
			// 				marginRight: "15px",
			// 				marginBottom: "15px",
			// 			}}
			// 		>
			// 			Back to Home page
			// 		</Link>
			// 	</div>
			// 	<button
			// 		className="btn btn-outline-secondary"
			// 		onClick={this.print}
			// 	>
			// 		Print
			// 	</button>
			// </div>
			<div className="fullDetailedBill">
				<h1 style={{ textAlign: "center" }}>
					<span contentEditable>TAX INVOICE</span>
				</h1>
				<article style={{ paddingBottom: "0%", marginBottom: "0%" }}>
					<address contentEditable style={{ width: "40%" }}>
						<p style={{ fontSize: "medium" }}>
							Customer Name : {this.state.customer_name}
							<br />
							Billing Address : {this.state.billing_address}
							<br />
							Party Gst no.- {this.state.gst_no}
						</p>
					</address>
					<table
						className="meta"
						style={{ padding: "0%", marginBottom: "0%" }}
					>
						<tbody>
							<tr>
								<th>
									<span contentEditable>Invoice No.</span>
								</th>
								<td>
									<span contentEditable>
										:invoice_id/{this.state.year}
									</span>
								</td>
								<th>
									<span contentEditable>Date:</span>
								</th>
								<td>
									<span contentEditable>
										{this.state.date_of_supply
											.toString()
											.slice(0, 10)}
									</span>
								</td>
							</tr>
							<tr>
								<th>
									<span contentEditable>Challan No.</span>
								</th>
								<td>
									<span contentEditable>
										:invoice_id/{this.state.year}
									</span>
								</td>
								<th>
									<span contentEditable>Date:</span>
								</th>
								<td>
									<span contentEditable>
										{this.state.date_of_supply
											.toString()
											.slice(0, 10)}
									</span>
								</td>
							</tr>
							<tr>
								<th>
									<span contentEditable>Order No.</span>
								</th>
								<td>
									<span contentEditable>:order_number</span>
								</td>
								<th>
									<span contentEditable>Date:</span>
								</th>
								<td>
									<span contentEditable>:order_date</span>
								</td>
							</tr>
							<tr>
								<th>
									<span contentEditable>LR. No.</span>
								</th>
								<td>
									<span contentEditable />
								</td>
								<th>
									<span contentEditable>Date:</span>
								</th>
								<td>
									<span contentEditable>
										{this.state.date_of_supply
											.toString()
											.slice(0, 10)}
									</span>
								</td>
							</tr>
							<tr>
								<th style={{ fontSize: "x-small" }}>
									<span contentEditable>Place of suplly</span>
								</th>
								<td>
									<span contentEditable>
										:place_of_supply
									</span>
								</td>
								<th>
									<span contentEditable>code</span>
								</th>
								<td>
									<span contentEditable>:place_code</span>
								</td>
							</tr>
						</tbody>
					</table>
					<table className="inventory" style={{ margin: 0 }}>
						<thead>
							<tr>
								<th style={{ width: "5%" }}>
									<span contentEditable>SNO</span>
								</th>
								<th style={{ width: "30%" }}>
									<span contentEditable>Description</span>
								</th>
								<th style={{ width: "12%" }}>
									<span contentEditable>HSN</span>
								</th>
								<th style={{ width: "8%" }}>
									<span contentEditable>Quantity (Nos)</span>
								</th>
								<th style={{ width: "9%" }}>
									<span contentEditable>Rate</span>
								</th>
								<th style={{ width: "7%" }}>
									<span contentEditable>Per</span>
								</th>
								<th style={{ width: "14%" }}>
									<span contentEditable>Total</span>
								</th>
								{/* <th><span contenteditable>Item</span></th>
							<th><span contenteditable>Description</span></th>
							<th><span contenteditable>Rate</span></th>
							<th><span contenteditable>Quantity</span></th>
							<th><span contenteditable>Price</span></th> */}
							</tr>
						</thead>
						<tbody>
							{bill}
							<tr>
								<td />
								<td className="desc">TOTAL</td>
								<td />
								<td />
								<td />
								<td />
								<td>
									<span contentEditable>
										{this.state.total_amount}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
					<table></table>
					<table>
						<tbody>
							<tr>
								<td style={{ width: "50%" }} />
								<th>
									<span contentEditable>Total</span>
								</th>
								<td>
									<span>Rs.</span>
									<span>{this.state.total_amount}</span>
								</td>
							</tr>
							<tr>
								<td
									style={{
										width: "50%",
										textAlign: "center",
									}}
								>
									:transport
								</td>
								<th>
									<span contentEditable>SGST 9%</span>
								</th>
								<td>
									<span />
									<span contentEditable>
										{this.state.sgst_amount}
									</span>
								</td>
							</tr>
							<tr>
								<td
									style={{
										width: "50%",
										textAlign: "center",
									}}
								>
									(:cartons cartons :bundles)
								</td>
								<th>
									<span contentEditable>CGST 9%</span>
								</th>
								<td>
									<span />
									<span contentEditable>
										{this.state.cgst_amount}
									</span>
								</td>
							</tr>
							<tr>
								<td style={{ width: "50%" }} rowSpan={2}>
									{number_to_word.toWords(
										Math.round(
											this.state.total_amount +
												this.state.sgst_amount +
												this.state.cgst_amount +
												this.state.igst_amount
										)
									)}
								</td>
								<th>
									<span contentEditable>IGST 18%</span>
								</th>
								<td>
									<span />
									<span contentEditable>
										{this.state.igst_amount}
									</span>
								</td>
							</tr>
							<tr>
								<th>
									<span contentEditable>G.Total</span>
								</th>
								<td>
									<span>Rs.</span>
									<span>
										{Math.round(
											this.state.total_amount +
												this.state.sgst_amount +
												this.state.cgst_amount +
												this.state.igst_amount
										)}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</article>
				<br />
				<table>
					<tbody>
						<tr>
							<td style={{ width: "40%" }}>
								{" "}
								<span contentEditable>
									GST NO:27AAAFT1127D1ZP
								</span>
							</td>
							<td> </td>
							<td style={{ width: "32%" }}>
								{" "}
								<span contentEditable />
								Payment Terms within……30…Days
							</td>
						</tr>
					</tbody>
				</table>
				<aside>
					<table>
						<tbody>
							<tr>
								<td style={{ width: "40%" }} rowSpan={4}>
									<span contentEditable>
										Terms: <br /> 1) Goods once sold will
										not be taken back. <br /> 2)Sellers will
										not accept any responsibility or admit
										any claims forshortage of any or damage
										after thegoods have left their premises.{" "}
										<br />
										3)Interest at rate 24% will be chargeon
										all bills not paid within due date.
									</span>
								</td>
								<td rowSpan={4} style={{ textAlign: "center" }}>
									<span contentEditable>
										<h2> COMPANY'S BANK DETAILS</h2>
										<br />
										BANK NAME:BANK OF BARODA <br />
										A/C NO: 19750200000831
										<br />
										BRANCH &amp; IFS CODE: <br />
										KURLA <br />
										BARBOKURLAX <br />
									</span>
								</td>
								<td
									rowSpan={4}
									style={{ width: "32%", textAlign: "right" }}
								>
									<span contentEditable>
										FOR TARUN ENGINEERING WORKS
										<br />
										<br />
										<br />
										<br />
										<br />
										<br />
										<br />
										Partner{" "}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</aside>
				<div>
					<Link
						to={{
							pathname: "/show",
							state: values,
						}}
						className="btn btn-outline-secondary"
						style={{
							// backgroundColor: "#fcf93c",
							marginTop: "15px",
							marginRight: "15px",
							marginBottom: "15px",
						}}
					>
						Back to Home page
					</Link>
				</div>
				<button
					className="btn btn-outline-secondary"
					onClick={this.print}
				>
					Print
				</button>
			</div>
		);
	}
}

export default withRouter(Showbill);
