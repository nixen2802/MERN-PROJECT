const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const Mclient=require('mongodb').MongoClient;
mongoose.connect('mongodb://localhost:27017/Billing-System');
const db=mongoose.connection;
var url = "mongodb://localhost:27017/Billing-System";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const User=require("./models/users");
const Product=require("./models/products");
const Mainbill=require("./models/mainbill");
const Bill=require("./models/bills");
const Customer=require("./models/customer");

//Register route
app.post("/register",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const conpassword=req.body.conpassword;
    if(password==conpassword)
    {
        User.find((err,data)=>{
            if(err)
            {
                res.end("Failure");
            }
            else
            {
                let flag=true;
                for(let i=0;i<data.length;i++)
                {
                    if(data[i].email==email)
                    {
                        res.end("Failure");
                        flag=false;
                    }
                }
                if(flag==true)
                {
                    var user=new User({ email: email, password: password })
                    user.save((err,user)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            res.end("Success");
                        }
                    })	
                }
            }
        })
    }
    else
    {
        res.end("Failure");
    }
})

//Login route
app.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.find((err,data)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            let flag=false;
            for(let i=0;i<data.length;i++)
            {
                if(data[i].email==email)
                {
                    if(data[i].password==password)
                    {
                        res.end("Success");
                        flag=true;
                    }
                }
            }
            if(flag==false)
            {
                res.end("Failure");
            }
        }
    })
})

//Fetch all the mainbills route
app.get("/fetch",(req,res)=>{
    Mainbill.find((err,data)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.json(data);
            res.end();
        }
    })
})

//Add mainbill with inside bills route
app.post("/addbill",(req,res)=>{
    const billnumber=req.body.billnumber;
    const customer_name=req.body.customer_name;
    const date_of_supply=req.body.date_of_supply;
    var total_amount=0;
    var gst=0;
    const place_of_supply=req.body.place_of_supply;
    const transporter_info=req.body.transporter_info;
    var gst_no=req.body.gst_no;
    var billing_address=req.body.billing_address;
    const billValues=req.body.billValues;
    Mclient.connect(url, (err,db)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            var obj=[];
            for(let i=0;i<billValues.length;i++)
            {
                billValues[i].billnumber=billnumber;
                total_amount=total_amount+billValues[i].amount;
                obj.push(billValues[i])
            }
            gst=total_amount*18/100;
            total_amount=total_amount+gst;
            var dbase=db.db("Billing-System");
            dbase.collection("bills").insertMany(obj,(err,result)=>{
                if(err)
                {
                    res.end("Failure");
                }
                else
                {
                    var bill=new Mainbill({ billnumber: billnumber, customer_name: customer_name, date_of_supply: date_of_supply,
                        total_amount: total_amount,
                        gst: gst,
                        place_of_supply: place_of_supply,
                        transporter_info: transporter_info,
                        gst_no: gst_no,
                        billing_address: billing_address
                     })
                    bill.save((err,user)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            res.end("Success");
                        }
                    })    
                }
            })
        }
    })
})

//Fetch all products route
app.get("/fetch_products",(req,res)=>{
    Product.find((err,data)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.json(data);
            res.end();
        }
    })
})

//Add product route
app.post("/addproducts",(req,res)=>{
    const name=req.body.name;
    const item_code=req.body.item_code;
    const price=req.body.price;
    const hsn_code=req.body.hsn_code;
    var product=new Product({name: name,item_code: item_code,price:price,hsn_code:Number(hsn_code)});
    product.save((err,product)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.end("Success");
        }
    })
})

//Fetch all the bills inside mainbill route
app.get("/fetch_bills",(req,res)=>{
    Bill.find({billnumber:Number(req.query.id)},(err,data)=>{
        if(err)
        {
            res.end("Failure")
        }
        else
        {
            res.json(data);
            res.end();
        }
    })
})

//Fetch mainbill details in show bills page
app.get("/fetch_bill_details",(req,res)=>{
    Mainbill.find({billnumber: Number(req.query.id)},(err,data)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.json(data)
            res.end();
        }
    })
})

//Fetch all the customers route
app.get("/fetch_customers",(req,res)=>{
    Customer.find((err,data)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.json(data);
            res.end();
        }
    })
})

//Add products route
app.post("/addcustomer",(req,res)=>{
    const cust_name=req.body.cust_name;
    const gst_no=req.body.gst_no;
    const billing_address=req.body.billing_address;
    console.log(cust_name,gst_no,billing_address);
    var customer=new Customer({cust_name: cust_name, gst_no: gst_no, billing_address: billing_address});
    customer.save((err,customer)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.end("Success");
        }
    })
})

//Update customer get
app.get("/fetch_individual_customer",(req,res)=>{
    Customer.find({_id: mongoose.mongo.ObjectId(req.query.id)},(err,data)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.json(data);
            res.end();
        }
    })
})

//Update customer
app.post("/updatecustomer",(req,res)=>{
    const id=req.body.id;
    const cust_name=req.body.cust_name;
    const gst_no=req.body.gst_no;
    const billing_address=req.body.billing_address;
    var customer=new Customer({_id: id, cust_name: cust_name, gst_no: gst_no, billing_address: billing_address});
    Customer.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id)}, customer, {upsert: true}, (err, result)=> {
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.end("Success");
        }
    });
})

//Update product get
app.get("/fetch_individual_product",(req,res)=>{
    Product.find({_id: mongoose.mongo.ObjectId(req.query.id)},(err,data)=>{
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.json(data);
            res.end();
        }
    })
})

//Update product
app.post("/updateproduct",(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const item_code=req.body.item_code;
    const price=req.body.price;
    const hsn_code=req.body.hsn_code;
    var product=new Product({_id: id, name: name, item_code: Number(item_code), price: Number(price), hsn_code: (hsn_code)});
    Product.findOneAndUpdate({_id: mongoose.mongo.ObjectId(id)}, product, {upsert: true}, (err, result)=> {
        if(err)
        {
            res.end("Failure");
        }
        else
        {
            res.end("Success");
        }
    });
})

//Server started on port 5000
app.listen(5000,()=>{
    console.log("Server listening on port 5000!!!");
})