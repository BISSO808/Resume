const express = require('express');
const router = express.Router();
Experience = require('../model/experiences');
const moment = require('moment');
moment().format();
const { check, validationResult } = require('express-validator/check');
router.get('/',(req,res,next)=>{
Experience.getExperience((err, experience)=>{
if(err){
   res.return(err);
}
res.render('experience',{
    experience:experience
});
});
});
router.get('/add',(req, res, next)=>{
    res.render('add');
});
router.post('/submit',(req, res, next)=>{
    start=moment(req.body.start).format("MMM Do YY"); 
let newExperience = new Experience ({
    title:req.body.title,
    start: req.body.start,
    end: req.body.end,
    description:req.body.description
});
req.check('title','title is required').isLength({min:1});
req.check('start','Start date should be before the end date').isBefore(req.body.end);
var errors = req.validationErrors();
if(errors){
    res.render('add',{
        errors:errors
    });
}
else{
Experience.addExperience(newExperience, (err, experience)=>{
if(err) throw err;
   req.flash('success_msg','Experience added');
    res.redirect('add');
});
}
});
router.get('/delete/:id',(req, res, next)=>{
Experience.deleteExperience(req.params.id,(err, experience)=>{
if(err)throw err;
req.flash('success_msg','Successfully deleted');
    res.redirect('/experience');

});
});
router.post('/edit/:id',(req, res, next)=>{
    let newExperience = new Experience();
    const query = {_id: req.params.id};
        console.log(req.params.title);
        const update={
        title:req.body.title,
        start:req.body.start,
        end:req.body.end,
        description:req.body.description
            }
    Experience.editExperience(query, update, {}, (err,experience)=>{
    if(err){
        res.render(err);
    }
       res.redirect('/experience');
});
});
router.get('/edit/:id',(req, res, next)=>{
    Experience.getByID(req.params.id,(err, experience)=>{
        if(err){
           res.return(err);
        }
        res.render('edit',{
            experience:experience
        });
        });
        });
module.exports= router;