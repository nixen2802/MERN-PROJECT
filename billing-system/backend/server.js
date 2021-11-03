const express=require('express');
const cors=require('cors');
const app=express();
var Mclient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    Mclient.connect(url,(err,db)=>{
        if(err)
        {
            console.log(err);
            throw err;
        }
        else
        {
            var dbase=db.db('Billing-System');
            dbase.collection('Users').find({}).toArray((err,result)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    let flag=0;
                    for(let i=0;i<result.length;i++)
                    {
                        if(result[i].email===email)
                        {
                            flag=1;
                            if(result[i].password===password)
                            {
                                res.send("Success");
                            }
                            else
                            {
                                res.send("Failure");
                            }
                            break;
                        }
                    }
                    if(flag==0)
                    {
                        res.send("Failure");
                    }
                    db.close();
                }
            })
        }
    })
})
app.post('/register', (req, res)=> {
    const email=req.body.email;
    const password=req.body.password;
    const conpassword=req.body.conpassword;
    if(password===conpassword){
        res.end("Success");
        Mclient.connect(url,(err,db)=>{
            if(err)
            {
                console.log(err);
                throw err;
            }
            else
            {
                var obj={email: email, password: password};
                var dbase=db.db('Billing-System');
                dbase.collection('Users').insertOne(obj,(err,res)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        db.close();
                    }
                })
            }
        })
    }
    else{
        res.end("Failure");
    }
  });
app.listen(5000,(req,res)=>{
    console.log("Server listening on port 5000!!!");
})

