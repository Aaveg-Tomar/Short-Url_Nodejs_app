const {v4 : uuidv4} = require("uuid");
const { render } = require("ejs");
const User = require("../models/user");
const {setUser , getUser} = require("../service/auth")

const handleUserSignUp = async(req , res) =>{

    const {name , email , password} = req.body;
    await User.create({
        name , 
        email , 
        password ,
    });
    return res.redirect("/")


}


const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    const userfind = await User.findOne({
        email,
        password,
    });

    console.log("user", userfind);

    if (!userfind) {
        // Render login with an error message if the user is not found
        return res.render("login", {
            error: "Invalid username or password",
        });
    }

    // If user is found, redirect to the home page
    const sessionId = uuidv4();
    setUser(sessionId , userfind);

    res.cookie('uid' , sessionId);
    return res.redirect("/");
};


module.exports = { handleUserSignUp , handleUserLogin }; 