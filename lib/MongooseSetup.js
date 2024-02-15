import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default () =>{

    //Connect to Mongo using Mongoose
const connectionString =`mongodb+srv://${process.env.MONGO_USER}:$
{process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.cubzl39.
mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
    .then(() => console.info("MongoDB Connected"))
    .catch(error => console.error(error)); 

};
