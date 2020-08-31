const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = Schema({
    userId: {type:String, required:true},
    username:{type:String, required: true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    places:[{type:mongoose.Types.ObjectId, required:true, ref: 'Places'}]
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
