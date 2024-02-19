var express = require("express");
const session = require('express-session');
var router = express.Router();

var loginregister = require('../registerandlogin/userlogin')

const verifyLogin=(req,res,next)=>{
  if(req.session.ownerloggedIn){
    next()
  }else{
    res.redirect('/gymowner/register')
  }
}

/* GET home page. */
router.get("/registergym",verifyLogin, function (req, res, next) {
  res.render("gym-owner/registergym");

});

router.get('/address',function(req,res){

  res.render("gym-owner/getaddress");


})

router.post('/address',function(req,res){

  console.log(req.body)

})


router.get("/register", function (req, res, next) {
  res.render("gym-owner/register");
});

router.get("/imageupload", function (req, res, next) {
  res.render("gym-owner/gymimage");
});

router.post('/register',(req,res,next)=>{
  loginregister.register(req.body).then((response)=>{
    console.log(response)
    req.session.gymowner= response
    req.session.ownerloggedIn=true
    res.redirect("/gymowner");
  })
})


router.post("/registergym", function (req, res, next) {
  console.log(req.body);
});

router.get("/", function (req, res, next) {
res.render("gym-owner/owner-dashboard")
});

module.exports = router;
