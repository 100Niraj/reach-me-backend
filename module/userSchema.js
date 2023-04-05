const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');




const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confpassword: {
        type: String,
        required: true
    }
    
})



//we use hashing 

userSchema.pre('save' , async function (next){
    console.log('Hi your password is hashing');
    if(this.isModified('password')){
     this.password = await bcrypt.hash(this.password , 12);
     this.confpassword = await  bcrypt.hash(this.confpassword , 12);
     //await use for promises return 
    }
    next();
});


// we are generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id:this._id }, process.env.SECRET_KEY);  //here we get id with the help of login of any user then we can verified which email id belongs , so we generate a token for this id 
        //jwt.sign(payload, secretOrPrivateKey,[option,callback])
        this.tokens = this.tokens.concat({token:token}); //token ko add kr diya
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

//now we difine the schema then we connect with connection(mongodb);

const User = mongoose.model('USER' ,  userSchema );

//NOW WE NEED TO REQUEST TO PORT FOR FRONTEND THEN WE HAVE TO DO EXPORT THIS;

module.exports = User;