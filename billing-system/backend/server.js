const express=require('express');
const alert = require('alert');
const router=require('express').Router();
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get('/register',(req,res)=>{
    console.log(req.body)
    res.json('Exercise added!!')
    res.end();
})
app.post('/register', function(req, res) {
    const newBook = {
        email: req.body.email,
        password: req.body.password,
        conpassword: req.body.password,
    };
    console.log(newBook);
  });
app.listen(5000,(req,res)=>{
    console.log("Server listening on port 5000!!!");
})