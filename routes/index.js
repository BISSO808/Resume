const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs');
Admin = require('../model/admin')
 router.get('/', (req, res, next)=>{
     res.render('index');
 });
 router.get('/admin',(req, res, next)=>{
    res.render('login', { 
    });
  });
  router.get('/register',(req, res, next)=>{
    res.render('register');
  
});
router.post('/submit',(req, res, next)=>{
  req.check('password', 'password is invalid').isLength({min:1});
  req.check('password', 'password is doesnot match').equals(req.body.repeatPassword);
var errors= req.validationErrors();
  if (errors){
  res.render('register',{
    errors:errors
  });
  }
else{
let newAdmin = new Admin({
password: req.body.password,
username : "admin"
});
 
Admin.registerAdmin( newAdmin ,(err,admin) => {
  if(err)throw err;
  req.flash('success_msg', 'you are registered as a user')
  res.redirect('/admin');
 });
  }
});
  router.post('/login',(req, res,next)=>{
    passport.authenticate('local', {
      failureRedirect: '/admin'
     , failureFlash:true,
    successRedirect:'/'
   })(req, res, next)
   });
   passport.serializeUser((admin, done) =>{
    done(null, admin.id);
  });
  
  passport.deserializeUser((id, done)=> {
    Admin.findById(id,(err, admin)=> {
      done(err, admin);
    });
  });
  passport.use(new LocalStrategy(
    (username,password, done) =>{
          Admin.getAdmin({ username: username }, (err, user) =>{
            if (err) { return done(err); }
            if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          bcrypt.compare(password, user.password,(err, isMatch)=>{
            if(err) return err;
            if(isMatch){
              return done(null, user);
            }else{
                return done(null, false, { message: 'wrong password' });
            }
                });
            });
          })
);
router.get('/changepassword', (req,res,next)=>{
  res.render('changepassword');
});
router.post('/changepassword',(req,res,next)=>{
  Admin.getAdmin('admin',(err, user)=>{
    if (err) { return err }
    console.log('stuff');
    bcrypt.compare(req.body.newpassword, user.password,(err, isMatch)=>{
      if(err) return err;
      if(isMatch){
        let newAdmin = new Admin({
          password: req.body.newpassword,
          username : "admin"
          });
           
          Admin.registerAdmin( newAdmin ,(err,admin) => {
            if(err)throw err;
            req.flash('success_msg', 'changed')
            res.redirect('/admin');
           });
      }else{
          return done(null, false, { message: 'wrong password' });
      }
          });
  });
    });
 module.exports= router;