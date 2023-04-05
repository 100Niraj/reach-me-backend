const mongoose = require('mongoose');

const DB  = "mongodb+srv://nirajkumarpatel264:9060979789@cluster0.mjvnllr.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB ,{
    // useNewUrlParser : true,
    // useCreateIndex : true,
    // useUnifiedTopology : true,
    // useFindAndModify :false

}).then(() =>{
    console.log('connect succesfully');
}).catch((err)= console.log('not connect succesfully'));
//gjjhjgjjh