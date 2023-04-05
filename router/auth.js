const express = require('express');
const app = express();
const router = express.Router();

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

require('../db/data');
const User = require("../module/userSchema");
const Authentication = require('../middleware/authentication');

router.get('/', (request, response) => {
    response.send('Hello world from router/auth NIRAJ'); ///require means response something 
});

//when any user filled any data then we get then we do this step post.();
// router.post('/register' ,(req , res)=> {
//     //here we use javascript promessses in 16hr video 
//     const {name , email, phone, address , password, confpassword} = req.body;
//     // console.log(name);
//     // console.log(email);
//     // console.log(phone);
//     // res.json({message:req.body});
//     // // res.send('mera register page'); so we need postman
//     if(!name || !email || !phone || !address || !password || !confpassword) {
//         return res.status(422).json({error: "plz filled the full data"});
//     }

//     User.findOne({email:email})
//     .then((userExist) =>{
//         if(userExist) {
//             return res.status(422).json({error:"Email.already Exist"});
//         }
//         const user = new User({name , email, phone, address, password, confpassword})

//         user.save().then(()=>{
//             res.status(201).json({message: "user registerd suddessfully"});

//         }).catch((err) = res.status(500).json({error: "Failed to registered"}));


//     }).catch(err => {console.log(err); });
// });


//now we use Async-Await version
router.post('/register', async (req, res) => {

    const { name, email, phone, address, password, confpassword } = req.body;

    if (!name || !email || !phone || !address || !password || !confpassword) {
        return res.status(422).json({ error: "plz filled the full data" });
    }

    try {


        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: "Email.already Exist" });
        }
        const user = new User({ name, email, phone, address, password, confpassword })
        const userRegister = await user.save();
        if (userRegister) {
            res.status(201).json({ message: "user registerd succesfully" });
        }
        else {
            res.status(500).json({ error: "Failed to registerd" });
        }

    } catch (err) {
        {
            console.log(err);
        }
    }


});








//login route

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message : "awesome"});
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "please filled the data" });
        }
        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);

        if (userLogin) {

            ///here we use check pass word match 
            const isMatch = await bcrypt.compare(password, userLogin.password);


            if (isMatch) {

                const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
                console.log(userLogin);
                console.log(token);

               return  res.status(200).json( {status:200,data:userLogin,token:token});

                
            }
            else  {
                return res.status(400).json({ error: "wrong password" });
            }
        }
        else{
            return res.status(400).json({ error: "sdfasd;flja" });
        }
       

    } catch (err) {


        return res.status(400).json({ error: "wrong password" });
    }
})




//here we put about page for authentication 
router.post('/about', Authentication, (req,res) => {
    console.log('hello my about page');
    res.status(200).json({status:200});
});


app.post('/contact/', Authentication,(req , res)=>
{
    console.log('My Contact');
    res.status(200).json({staus:200});


})

///logout page













module.exports = router;

