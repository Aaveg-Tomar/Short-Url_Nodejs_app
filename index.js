const express = require('express');
const path = require("path")
const { connectToMongoDB } = require("./connection");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();

const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => {
    console.log("Connected DB");
})

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));
 // -----------------------------------

 // Use for the testing 

// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({})
//     return res.render('home', {
//         urls: allUrls
//     });
// })

app.use("/url", urlRoute);
app.use("/" , staticRoute);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});