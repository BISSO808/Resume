const mongoose = require ('mongoose');
// experience schema
mongoose.connect('mongodb://localhost/resume',{useNewUrlParser: true});
const experienceSchema= mongoose.Schema({
    title:String,
    start: String,
    end: String,
    description: String
})
const Experience= mongoose.model('Experience', experienceSchema);
module.exports= Experience;

module.exports.getExperience = function(callback, limit){
    Experience.find(callback).limit(limit).sort[['title','ascending']]
}
module.exports.addExperience = function(experience, callback){
Experience.create(experience, callback);
}
module.exports.editExperience = function(conditions, update, options, callback){
   Experience.findOneAndUpdate(conditions, update, options, callback);
}
module.exports.deleteExperience= function(id, callback){
Experience.findByIdAndDelete(id, callback);
}
module.exports.getByID= function(id,callback){
    Experience.findById(id,callback);
}