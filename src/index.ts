import express from "express";
import mongoose from "mongoose" ;
import router from "./routes";

const app = express();
app.use(express.json());

const MONGO_URL = "mongodb+srv://rittymariyakr:ritty@cluster0.tgiace8.mongodb.net/moviedb?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URL, {
    
}).then(()=>{
    console.log('Database Connected');
    
}).catch((error)=> console.log(error));

app.use("/",router);

app.listen(4000, ()=>{
    console.log(`server running on http://localhost:4000`);
    
});
