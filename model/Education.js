const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/resume',{useNewUrlParser: true});
const educationSchema=({
    degree:String,
    Institution: String,
    start: String,
    end: String
})
const Education = mongoose.model('Education', educationSchema);
module.exports= Education;

module.exports.addEducation=function(education, callback){
    Education.create(education,callback);
}
module.exports.getEducation = function (callback,limit){
    Education.find(callback).limit(limit).sort['end','ascending']
}
module.exports.deleteEducation= function(id,callback){
    Education.findByIdAndDelete(id,callback);
}