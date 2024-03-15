var express = require('express');
var router = express.Router();

var loginregister = require('../helpers/registerandlogin/adminlogin')




const verifyLogin=(req,res,next)=>{
  if(req.session.adminloggedIn){
    next()
  }else{
    res.redirect('/admin/login')
  }
}

/* GET users listing. */
router.get('/',verifyLogin, function(req, res, next) {
  res.render('admin/adminhome');
});

router.get('/login',(req,res)=>{
  res.render('admin/adminlogin')
})


router.post('/login',(req,res)=>{
  loginregister.login(req.body).then((response)=>{
    if(response.status){
      req.session.admin= response.val
      req.session.adminloggedIn=true
    }  
    res.redirect("/admin");
    console.log(response)
  })
})






module.exports = router;
