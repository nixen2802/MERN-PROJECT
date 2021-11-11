const express = require("express");
const cors = require("cors");
const app = express();
const mongoose=require('mongoose')
var Mclient = require("mongodb").MongoClient;
const User=require("./models/users");
const Product=require("./models/products")
const Bills=require("./models/bills")
const Mainbill=require("./models/mainbill")
mongoose.connect('mongodb://localhost:27017/Billing-System');
const db=mongoose.connection;
// var url="mongodb+srv://admin:1234@cluster0.fm3ut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var url = "mongodb://localhost:27017/Billing-System";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	Mclient.connect(url, (err, db) => {
		if (err) {
			console.log(err);
			throw err;
		} else {
			var dbase = db.db("Billing-System");
			dbase
				.collection("users")
				.find({})
				.toArray((err, result) => {
					if (err) {
						console.log(err);
					} else {
						let flag = 0;
						for (let i = 0; i < result.length; i++) {
							if (result[i].email === email) {
								flag = 1;
								if (result[i].password === password) {
									res.send("Success");
								} else {
									res.send("Failure");
								}
								break;
							}
						}
						if (flag == 0) {
							res.send("Failure");
						}
						db.close();
					}
				});
		}
	});
});
app.post("/register", (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		const conpassword = req.body.conpassword;
		var tempflag=true;
		if(password==conpassword)
		{
			Mclient.connect(url, (err, db) => {
				if (err) {
					console.log(err);
					throw err;
				} else {
					var obj = { email: email, password: password };
					var dbase = db.db("Billing-System");
					dbase
						.collection("users")
						.find({})
						.toArray((err, result) => {
							if (err) {
								console.log(err);
							} else {
								let flag = false;
								for (let i = 0; i < result.length; i++) {
									if (result[i].email === email) {
										flag = true;
										break;
									}
								}
								if (flag) {
									res.send("Email already in use");
								} else {
									dbase
										.collection("users")
										.insertOne(obj, (err, res) => {
											if (err) {
												console.log(err);
											} else {
												db.close();
											}
										});
								}
							}
						});
				}
			});
		} 
		else {
			res.end("Failure");
		}
	});
	
app.get("/fetch", (req, res) => {
	Mclient.connect(url, (err, db) => {
		if (err) {
			console.log(err);
			throw err;
		} else {
			var dbase = db.db("Billing-System");
			dbase
				.collection("mainbills")
				.find({})
				.toArray((err, result) => {
					if (err) {
						console.log(err);
					} else {
						res.send(result);
					}
					db.close();
				});
		}
	});
});
app.post("/addbill", (req, res) => {
	const bills = req.body.billValues;
	const billnumber = req.body.billnumber;
	const name = req.body.name;
	const quantity = req.body.quantity;
	const price = req.body.price;
	var total_amount = 0;
	const company_name = req.body.company_name;
	// var obj = [];
	// for (let i = 0; i < bills.length; i++) {
	// 	bills[i].bill_no = billnumber;
	// 	total_amount = total_amount + bills[i].price;
	// 	obj.push(bills[i]);
	// }
	// var bill=new Bills(obj);
	
	// bill.insertMany()
	Mclient.connect(url, (err, db) => {
		if (err) {
			console.log(err);
			throw err;
		} else {
			var obj = [];
			for (let i = 0; i < bills.length; i++) {
				bills[i].bill_no = billnumber;
				total_amount = total_amount + bills[i].price;
				obj.push(bills[i]);
			}
			var dbase = db.db("Billing-System");
			dbase
				.collection("bills")
				.find({})
				.toArray((err, result) => {
					if (err) {
						console.log(err);
					} else {
						dbase
							.collection("bills")
							.insertMany(obj, (err, result) => {
								if (err) {
									console.log(err);
								} else {
									res.send("Success");
								}
							});
						obj = {
							billlnumber: billnumber,
							total_amount: total_amount,
							company_name: company_name,
						};
						dbase
							.collection("mainbills")
							.insertOne(obj, (err, result) => {
								if (err) {
									console.log(err);
								} else {
									db.close();
								}
							});
					}
				});
		}
	});
});
app.get("/fetch_products", (req, res) => {
	Mclient.connect(url, (err, db) => {
		if (err) {
			console.log(err);
			throw err;
		} else {
			var dbase = db.db("Billing-System");
			dbase
				.collection("products")
				.find({})
				.toArray((err, result) => {
					if (err) {
						console.log(err);
					} else {
						res.send(result);
					}
					db.close();
				});
		}
	});
});
app.post("/addproducts", (req, res) => {
	const name = req.body.name;
	const item_code=req.body.item_code;
	const price = req.body.price;
	const hsn_code=req.body.hsn_code;
	var temp=true;
	var product=new Product({ name: name, item_code: Number(item_code), price: Number(price), hsn_code: Number(hsn_code) })
	// product.save((err,product)=>{
	// 	if(err)
	// 	{
	// 		console.log(err);
	// 	}
	// 	else
	// 	{
	// 		console.log("Insertion successfull!!!");
	// 		res.send("Success")
	// 	}
	// })	
	Mclient.connect(url, (err, db) => {
		if (err) {
			console.log(err);
			throw err;
		} else {
			var obj = { name: name, item_code: item_code, price: price, hsn_code: hsn_code };
			var dbase = db.db("Billing-System");
			dbase.collection("products").insertOne(obj, (err, result) => {
				if (err) {
					res.send("Failure");
					console.log(err);
				} else {
					res.send("Success");
					db.close();
				}
			});
		}
	});
	
});
app.get("/fetch_bills", (req, res) => {
	Mclient.connect(url, (err, db) => {
		if (err) {
			console.log(err);
			throw err;
		} else {
			var dbase = db.db("Billing-System");
			dbase
				.collection("bills")
				.find({ bill_no: Number(req.query.id) })
				.toArray((err, result) => {
					if (err) {
						console.log(err);
					} else {
						res.send(result);
					}
					db.close();
				});
		}
	});
});
app.get("/fetch_bill_details", (req, res) => {
	Mclient.connect(url, (err, db) => {
		if (err) {
			console.log(err);
			throw err;
		} else {
			var dbase = db.db("Billing-System");
			dbase
				.collection("mainbills")
				.find({ billlnumber: Number(req.query.id) })
				.toArray((err, result) => {
					if (err) {
						console.log(err);
					} else {
						res.send(result);
					}
					db.close();
				});
		}
	});
});
app.listen(5000, (req, res) => {
	console.log("Server listening on port 5000!!!");
});
