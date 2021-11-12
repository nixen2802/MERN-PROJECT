import "./Showbill.css";
import { Link, useParams, withRouter } from "react-router-dom";
import React from "react";
import axios from "axios";
import number_to_word from "number-to-words";

function numberToEnglish(n, custom_join_character) {
	var string = n.toString(),
		units,
		tens,
		scales,
		start,
		end,
		chunks,
		chunksLen,
		chunk,
		ints,
		i,
		word,
		words;

	var and = custom_join_character || "and";

	/* Is number zero? */
	if (parseInt(string) === 0) {
		return "zero";
	}

	/* Array of units as words */
	units = [
		"",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
		"eleven",
		"twelve",
		"thirteen",
		"fourteen",
		"fifteen",
		"sixteen",
		"seventeen",
		"eighteen",
		"nineteen",
	];

	/* Array of tens as words */
	tens = [
		"",
		"",
		"twenty",
		"thirty",
		"forty",
		"fifty",
		"sixty",
		"seventy",
		"eighty",
		"ninety",
	];

	/* Array of scales as words */
	scales = [
		"",
		"thousand",
		"million",
		"billion",
		"trillion",
		"quadrillion",
		"quintillion",
		"sextillion",
		"septillion",
		"octillion",
		"nonillion",
		"decillion",
		"undecillion",
		"duodecillion",
		"tredecillion",
		"quatttuor-decillion",
		"quindecillion",
		"sexdecillion",
		"septen-decillion",
		"octodecillion",
		"novemdecillion",
		"vigintillion",
		"centillion",
	];

	/* Split user arguemnt into 3 digit chunks from right to left */
	start = string.length;
	chunks = [];
	while (start > 0) {
		end = start;
		chunks.push(string.slice((start = Math.max(0, start - 3)), end));
	}

	/* Check if function has enough scale words to be able to stringify the user argument */
	chunksLen = chunks.length;
	if (chunksLen > scales.length) {
		return "";
	}

	/* Stringify each integer in each chunk */
	words = [];
	for (i = 0; i < chunksLen; i++) {
		chunk = parseInt(chunks[i]);

		if (chunk) {
			/* Split chunk into array of individual integers */
			ints = chunks[i].split("").reverse().map(parseFloat);

			/* If tens integer is 1, i.e. 10, then add 10 to units integer */
			if (ints[1] === 1) {
				ints[0] += 10;
			}

			/* Add scale word if chunk is not zero and array item exists */
			if ((word = scales[i])) {
				words.push(word);
			}

			/* Add unit word if array item exists */
			if ((word = units[ints[0]])) {
				words.push(word);
			}

			/* Add tens word if array item exists */
			if ((word = tens[ints[1]])) {
				words.push(word);
			}

			/* Add 'and' string after units or tens integer if: */
			if (ints[0] || ints[1]) {
				/* Chunk has a hundreds integer or chunk is the first of multiple chunks */
				if (ints[2] || (!i && chunksLen)) {
					words.push(and);
				}
			}

			/* Add hundreds word if array item exists */
			if ((word = units[ints[2]])) {
				words.push(word + " hundred");
			}
		}
	}

	return words.reverse().join(" ");
}
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
					<span contentEditable>Rs. {bill.amount}</span>
				</td>
			</tr>
		));

		return (
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
									<span contentEditable>Place of supply</span>
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
										Rs. {this.state.total_amount}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
					<table></table>
					<table>
						<tbody>
							<tr>
								<td></td>
								<td style={{ width: "25%" }} />
								<th>
									<span contentEditable>Total</span>
								</th>
								<td>
									<span>Rs. </span>
									<span>{this.state.total_amount}</span>
								</td>
							</tr>
							<tr>
								<th
									style={{
										width: "25%",
										textAlign: "center",
									}}
								>
									Transport Info
								</th>
								<td
									style={{
										textAlign: "center",
									}}
								>
									<span>{this.state.transporter_info}</span>
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
								<th>Container Info</th>
								<td
									style={{
										width: "25%",
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
								<th rowSpan={2}>Amount in words</th>
								<td style={{ width: "25%" }} rowSpan={2}>
									{numberToEnglish(
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
									<span>Rs. </span>
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
									GST NO: {this.state.gst_no}
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
