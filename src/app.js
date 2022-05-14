const express =require("express");
const { dirname } = require("path");
const bodyParser = require("body-parser")
const path=require("path");
const app=express();
const hbs=require("hbs");
const port=process.env.PORT || 8000;


require("./db/conn");
const Register=require("./models/registration");
const async = require("hbs/lib/async");

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{

    res.render("register")


})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/register",async (req,res)=>{
    try {
const password=req.body.password;
const cpassword=req.body.confirmpassword;
        if (password ===cpassword ){
            const registerDhun=new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                password:password,
                confirmpassword:cpassword
                
                
            })
            const registered=await registerDhun.save();
            // console.log(registered)
            res.status(201).render("login");
        }
        else{
            res.send("password are not matching");
        }


        
    } catch (error) {
        res.status(400).send(error);
    }
})




 app.post("/login",async (req,res)=>{
    try {
const password=req.body.password;
const email=req.body.email;

        const usermail =await Register.findOne({email:email});
        // res.send(usermail.password);
        // console.log(usermail);
        if(usermail.password===password){
            res.status(201).render("index");

        }else
        {
            res.send("Password Incorrect");

        }
        
    } catch (error) {
        res.status(400).send(error);
    }
})




app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
});
