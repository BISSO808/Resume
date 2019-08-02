const express = require('express');
const router = express.Router();
 router.get('/users', (res, req, next)=>{
     res.render('users');
 });
 module.exports= router;