var express = require("express");
const session = require('express-session');
var router = express.Router();

var loginregister = require('../helpers/registerandlogin/userlogin')
var gymregister = require("../helpers/gymregister/gymreg")

const verifyLogin=(req,res,next)=>{
  if(req.session.ownerloggedIn){
    next()
  }else{
    res.redirect('/gymowner/register')
  }
}

/* GET home page. */
router.get("/registergym", verifyLogin,function (req, res, next) {
  res.render("gym-owner/registergym");

});

router.get('/address',function(req,res){

  res.render("gym-owner/getaddress");


})

router.post('/address',function(req,res){

  console.log("hi")
  
})


router.get("/register", function (req, res, next) {
  res.render("gym-owner/register");
});

router.get("/imageupload", function (req, res, next) {
  res.render("gym-owner/gymimage");
});

router.get("/login",(req,res,next)=>{

  res.render("gym-owner/login")
})

router.post("/login",(req,res,next)=>{
  loginregister.login(req.body).then((response)=>{
    if(response.status){
      req.session.gymowner= response.val
      req.session.ownerloggedIn=true
    }  
    res.redirect("/gymowner");

    console.log(response)
  })
})

router.post('/register',(req,res,next)=>{
  loginregister.register(req.body).then((response)=>{
    console.log(response)
    req.session.gymowner= response
    req.session.ownerloggedIn=true
    res.redirect("/gymowner");
  })
})


router.post("/registergym", verifyLogin,function (req, res, next) {
 req.body.gymowner=req.session.gymowner._id
  
  if (req.body.holidayDays) {
    
  }else{
    req.body.holidayDays=[]
  }

  req.body.dailyfees=gymregister.calculatedailyfee(req.body.monthlyFees,req.body.holidayDays)

  gymregister.gymregisterstep1(req.body).then((response)=>{
    console.log(response)
  })

  
});

router.get("/",verifyLogin, function (req, res, next) {
res.render("gym-owner/owner-dashboard",{username:req.session.gymowner.username})
//console.log(req.session.gymowner.username)
});

module.exports = router;
