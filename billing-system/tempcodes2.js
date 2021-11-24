//register on server with mongo client
// app.post("/register", (req, res) => {
// 	const email = req.body.email;
// 	const password = req.body.password;
// 	const conpassword = req.body.conpassword;
// 	var tempflag=true;
// 	User.find((err,data)=>{
// 		if(err)
// 		{
// 			console.log(err);
// 		}
// 		else
// 		{
// 			for(let i=0;i<data.length;i++)
// 			{
// 				if(data[i].email==email)
// 				{
// 					console.log("Found!!!")
// 					res.end("Failure");
// 					tempflag=false;
// 					break;
// 				}
// 			}
// 		}
// 	})
// 	if(tempflag==true)
// 	{
// 		console.log("Inside if!!")
// 		if (password === conpassword) {
// 			res.end("Success");
// 			var user=new User({ email: email, password: password })
// 			user.save((err,user)=>{
// 				if(err)
// 				{
// 					console.log(err);
// 				}
// 				else
// 				{
// 					console.log("Insertion successfull!!!");
// 				}
// 			})
// 	// 	Mclient.connect(url, (err, db) => {
// 	// 		if (err) {
// 	// 			console.log(err);
// 	// 			throw err;
// 	// 		} else {
// 	// 			var obj = { email: email, password: password };
// 	// 			var dbase = db.db("Billing-System");
// 	// 			dbase
// 	// 				.collection("Users")
// 	// 				.find({})
// 	// 				.toArray((err, result) => {
// 	// 					if (err) {
// 	// 						console.log(err);
// 	// 					} else {
// 	// 						let flag = false;
// 	// 						for (let i = 0; i < result.length; i++) {
// 	// 							if (result[i].email === email) {
// 	// 								flag = true;
// 	// 								break;
// 	// 							}
// 	// 						}
// 	// 						if (flag) {
// 	// 							res.send("Email already in use");
// 	// 						} else {
// 	// 							dbase
// 	// 								.collection("Users")
// 	// 								.insertOne(obj, (err, res) => {
// 	// 									if (err) {
// 	// 										console.log(err);
// 	// 									} else {
// 	// 										db.close();
// 	// 									}
// 	// 								});
// 	// 						}
// 	// 					}
// 	// 				});
// 	// 		}
// 	// 	});
// 	} 
// 	else {
// 		res.end("Failure");
// 	}}
// });

//Login mclient
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
				.collection("Users")
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

//initial addproduct.js

Mclient.connect(url, (err, db) => {
	if (err) {
		console.log(err);
		throw err;
	} else {
		var obj = { name: name, item_code: item_code, price: price, hsn_code: hsn_code };
		var dbase = db.db("Billing-System");
		dbase.collection("Products").insertOne(obj, (err, result) => {
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


// fetch mainbills
Mclient.connect(url, (err, db) => {
	if (err) {
		console.log(err);
		throw err;
	} else {
		var dbase = db.db("Billing-System");
		dbase
			.collection("mainbill")
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