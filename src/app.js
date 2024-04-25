const express = require ('express');
const path = require("path");
const bcrypt =  require("bcrypt");
const collection = require("./config");

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended : false}));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('firstpage');
  });
  app.get("/aboutus",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('aboutus');
  });
  app.get("/contact",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('contact');
  });
  app.get("/driverhome",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('driverhome');
  });
  app.get("/homeuser",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('homeuser');
  });
  app.get("/hospitals",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('hospitals');
  });
  app.get("/logindriver",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('logindriver');
  });
  app.get("/loginpage",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('loginpage');
  });
  app.get("/signupgrive",(req,res)=>{
    //res.sendFile(__dirname+"/index.html");
    res.render('signupgrive');
  });
  
  app.get("/singup",(req,res)=>{
      //res.sendFile(__dirname+"/index.html");
      res.render('singup');
  });

  app.post("/singup",async(req, res) => {
    const data =  {
        name: req.body.name,
        password: req.body.password
    }
    const existingUser = await collection.findOne({name: data.name});
    if (existingUser){
        res.send("User already exists. Please choose a different username.");
    }else{
  
    const userdata= await collection.insertMany(data);
    console.log(userdata);
    }
    { res.render("homeuser");
}
    });
    
    app.post("/loginpage", async(req,res ) =>{
    
        try{
    const check = await collection.findOne({name: req.body.name});
    if (!check){
        req.send("wrong password");
    
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (!isPasswordMatch){
        res.render("homeuser");

    
    }
    
    }catch{
        res.send("wrong details");

    }
    });

const port = 3000;
app.listen(port,()=> {
    console.log('Server running on port: $(port)');
})