const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');   //  It is a npm pakage to parse the cookiee
const { connectToMongoDB } = require("./connection");
const { restrictToLoggedinUserOnly , checkAuth } = require('./middleware/auth');
const URL = require("./models/url");


const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user")


const app = express();

const PORT = 8001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser() ); 


// Connection

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => {
    console.log("Connected DB");
})



app.set("view engine", "ejs");
app.set('views', path.resolve("./views")); // It is used for the path of frontend 


 // -----------------------------------

 // Use for the testing 

// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({})
//     return res.render('home', {
//         urls: allUrls
//     });
// })


// Routes

app.use("/url", restrictToLoggedinUserOnly, urlRoute);  // This is ShortId url is generated only when the user is login other wise not generated
app.use("/" , checkAuth,  staticRoute);  // Check only the user is login or not .
app.use("/user" , userRoute);  

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});