
import mongoose from "mongoose";
import http from "http";
import app from "./app";
import passport  from 'passport';


require('dotenv').config();



const port = process.env.process || 3002;
const server = http.createServer(app);


app.use(passport.initialize());
require('./config/passport')(passport);



mongoose.connect("mongodb://localhost:27017/trello", { useNewUrlParser: true})
    .then( () => console.log('MongoDb Connected'))
    .catch( err => console.log(err));




server.listen(port,()=>{
    console.log(`listening on ${port}`);
});