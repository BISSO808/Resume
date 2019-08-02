const express= require('express');
const router =express.Router();
const Education=require('../model/Education')
router.get('/',(req,res,next)=>{
   Education.getEducation((err,education)=>{
if(err) throw err;
res.render('education',{
    education:education
    });
    });
})
router.get('/add',(req, res, next)=>{
res.render('addEducation');
});
router.post('/submit',(req,res,next)=>{
let newEducation =new Education({
degree: req.body.degree,
institution: req.body.institution,
start:req.body.start,
end:req.body.end
});
req.check('degree','Degree is required').isLength({min:1});
req.check('institution','Institution is required').isLength({min:1});
req.check('start','Start should be before the end').isBefore(req.body.end);
var errors= req.validationErrors();
if(errors){
res.render('addEducation',{
    errors:errors
});
}
else{
Education.addEducation(newEducation, (err,education)=>{
    if(err) throw err;
    req.flash('success_msg','Education added');
    res.redirect('/education/add');
});
}
});
router.get('/delete/:id',(req,res,next)=>{
    
Education.deleteEducation(req.params.id,(err,education)=>{
if(err) throw err;
req.flash('success_msg','Education deleted');
res.redirect('/education')
})
})
module.exports=router;
