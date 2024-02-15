import express from "express";
import RoutesSetup from "./lib/RoutesSetup.js";
import dotenv from "dotenv";
import MongooseSetup  from "./lib/MongooseSetup.js";
import PassportSetup from "./lib/PassportSetup.js";
import session from "express-session";

dotenv.config();

MongooseSetup();

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
            secure:(process.env.NODE_ENV ==="production"),
            sameSite:(process.env.NODE_ENV === "production" ? "strict": "lex")
        
    }
}));

PassportSetup(app);

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("avatars"));
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
RoutesSetup(app);



app.use((error, _ , response,__) => {
    if(typeof error === "string"){
        error = new Error(error);
    }
    if(!error.status) error.status = 404;

    console.error(error);

    response.status(error.status).send(error.message);


});

export default app;