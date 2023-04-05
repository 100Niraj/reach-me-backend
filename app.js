const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();


dotenv.config({path: './config.env'});

const DB = process.env.DATABASE;

// const PORT = process.env.PORT;




//add with database mongodb
// const DB = 'mongodb+srv://nirajkumarpatel264:9060979789@cluster0.mjvnllr.mongodb.net/REACH-ME?retryWrites=true&w=majority'
//WE put mongoose in other file to bc we use many times then we port 
//but also we require;
require('./db/data');



const user = require('./module/userSchema');



//we got some data in form json then he cann't understand so i call a function then 
//computer can uderstand json formate; its line conver json to object;
app.use(express.json());

 
//we link the router files to make our route easyapp
app.use(require('./router/auth'));


//middleware :- it is basically root to go for next page when we require and give some asking move to next page

// const middleware = (request,require,next) =>{
//     console.log('First longin to page , then u move to next');
//     next();
    
// }




// we use rooter to host url /home /index /about etc;app
app.get('/', (request , require) => {
    require.send('Hello world from NIRAJ'); ///require means response something 

});
// app.get('/about/', (request, require)=>{
//     require.send('About my self');
// })
// app.get('/contact/', (request , require)=>
// {
//     require.send('My Contact');
// })

//if user want to port(listen) to this server then we do share this response 

app.listen(9060, () =>{
    console.log('server is running at port no 9060');
    console.log("Niraj is madarchod");
});

