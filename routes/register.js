var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
//connect to database
const db = require('monk')('localhost:27017/TestDB');


router.get('/', function(req, res, next) {
    res.render("blog");
  });
  router.get('/add', function(req, res, next) {
    res.render("register");
  });
  router.post('/add',[
    check("name","Please insert your name").not().isEmpty(),
    check("password","Please input your password").not().isEmpty(),
    check("telephone","Please insert your telephone number").not().isEmpty(),
    check("email","Please insert your Email").not().isEmpty(),


  ], function(req, res, next) {
    const result = validationResult(req);
    //สร้างตัวแปรเก็บ error 
    var errors = result.errors;
    //ถ้าเกิด errors ต้องทำต่อไปนี้
    if (!result.isEmpty()) {
      res.render('register',{errors:errors});
    }else{
        //insert to db
        var ct=db.get('register');
        ct.insert({
            name:req.body.name,
            password:req.body.password,
            telephone:req.body.telephone,
            email:req.body.email,
        },function(err,register){
            if(err){
                res.send(err);
            }else{
                req.flash("info", "Register done");
                res.location('/register/add');
                res.redirect('/register/add');
            
            }
        

        });
    }
    
  });

  /*router.get('/add', function(req, res, next) {
    res.send('Add product');
});
router.get('/edit', function(req, res, next) {
    res.send('Edit product');
});
router.get('/delete', function(req, res, next) {
    res.send('Delete product');
});*/
  
  module.exports = router;
