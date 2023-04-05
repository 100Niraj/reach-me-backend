const jwt = require('jsonwebtoken');
const user = require('../module/userSchema');


const Authentication = async(req , res, next) => {

    try{

        const {token} = req.body;
        console.log(token);
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);  //iske ander abb mera user ka pura details aa gaya hoga
        console.log(verifyToken);
        if(verifyToken)next(); 
    }
    catch (err) {
        return res.status(401).json('unathorized : No token provided');
    }

}

module.exports = Authentication;