const {Schema,model} = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true, 
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user',
    },
    bio:{
        type:String,
       maxLength:200,
    },
     profileImg:String,
     profession:String,
},
{
    timestamps:true,
});
userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
//ismatch 
userSchema.methods.comparePassword = async function(candidatepass){
    return await bcrypt.compare(candidatepass,this.password);
}
const User = new model("User",userSchema);
module.exports = User;
