const mongoose = require('mongoose');
const Schema = mongoose.Schema
let Objectid = Schema.Types.ObjectId
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

//创建UserSchema
const userSchema = new Schema({
    userId: {type:Objectid},
    userName: {unique:true,type:String},
    passWord:String, 
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
}) //加盐

//每次存储数据时都要执行
userSchema.pre('save', function(next){
    //let user = this
    console.log(this)
    bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.passWord,salt, (err,hash)=>{
            if(err) return next(err)
            this.passWord = hash
            next()
        }) 

    })
})

userSchema.methods = {
    comparePassword:(_passWord,passWord) => {
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_passWord,passWord,(err,data)=>{
                if(!err) resolve(data);
                else reject(err);
            })
        })
    }
}

mongoose.model('User',userSchema);