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
  
  app.get("/sigup",(req,res)=>{
      //res.sendFile(__dirname+"/index.html");
      res.render('sigup');
  });

app.post("/signup",async(req, res) => {
const data =  {
    name: req.body.firstname,
    password: req.body.password
}
const existingUser = await collection.findOne({name: data.name});
if (existingUser){
    res.send("User already exists. Please choose a different username.");
}else{
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(data.password, saltRounds);
data.password = hashedPassword; 
const userdata= await collection.insertMany(data);
console.log(userdata);
}

});

app.post("/login", async(req,res ) =>{
try{
const check = await collection.findOne({name: req.body.firstname});
if (!check){
    res.send("Username cannot be found");
}
const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
if (isPasswordMatch){
    res.render("home");

}else{
    req.send("wrong password");
}
}catch{
res.send("wrong details");
}
});

const port = 3000;
app.listen(port,()=> {
    console.log('Server running on port: $(port)');
})