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
class Showbill extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			billnumber: this.props.match.params.id,
			value: this.props.location.state,
			bills: [],
			bill_details: [],
		};
	}
	componentDidMount() {
		axios
			.get("http://localhost:5000/fetch_bills", {
				params: { id: this.state.billnumber },
			})
			.then((result) => {
				console.log(result.data);
				this.setState({
					bills: result.data,
				});
			});
		axios
			.get("http://localhost:5000/fetch_bill_details", {
				params: { id: this.state.billnumber },
			})
			.then((result) => {
				this.setState({
					bill_details: result.data,
				});
				console.log(this.state.bill_details);
			});
	}
	render() {
		const values = this.state.value;
		const billdetails = this.state.bill_details.map((bill) => (
			<div style={{ border: "1px solid black" }} key={bill._id}>
				<h3>{bill.billlnumber}</h3>
				<p>{bill.company_name}</p>
				<p>{bill.total_amount}</p>
			</div>
		));
		const bill = this.state.bills.map((bill) => (
			<div style={{ border: "1px solid black" }} key={bill._id}>
				<h3>{bill.name}</h3>
				<p>{bill.quantity}</p>
				<p>{bill.price}</p>
			</div>
		));

		return (
			<div>
				{billdetails}
				{bill}
				<div>
					<Link
						to={{
							pathname: "/show",
							state: values,
						}}
					>
						Back to Home page
					</Link>
				</div>
			</div>
		);
	}
}

export default withRouter(Showbill);
