const mongoose = require ('mongoose');
//connect to db
mongoose.connect('mongodb://localhost/resume',{useNewUrlParser: true});
const bcrypt= require('bcryptjs');
const adminSchema=  mongoose.Schema({
    username:String,
    password: String
})
const Admin =mongoose.model('Admin',adminSchema );
module.exports= Admin;
module.exports.getAdmin=function(username,callback){
    Admin.findOne(username,callback);
}
// Create user
module.exports.registerAdmin= function(newAdmin , callback){
    bcrypt.genSalt(10, (err, salt)=>{
bcrypt.hash(newAdmin.password, salt,(err,hash)=>{
if(err){
    console.log(err);
}else{
    newAdmin.password= hash;
    newAdmin.save(callback);
}
})
});
}