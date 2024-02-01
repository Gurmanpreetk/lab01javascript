import express from "express";
import PageRoutes from "./routes/PagesRoutes.js";
import CardRoutes from "./routes/CardRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
//Connect to Mongo using Mongoose
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.cubzl39.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.info("MongoDB Connected"))
    .catch(error => console.error(error)); 

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use((req, _, next) => {
    if(req.body && req.body ==="object" && "_method" in req.body){
        console.log("I HAVE THE BODY");
        const method = req.body._method;

        delete req.body._method;

        req.method = method;
    }
     next();
});

app.use("/", PageRoutes);
app.use("/cards", CardRoutes);




app.use((error, _ , response,__) => {
    if(typeof error === "string"){
        error = new Error(error);
    }
    if(!error.status) error.status = 404;

    console.error(error);

    response.status(error.status).send(error.message);


});

export default app;