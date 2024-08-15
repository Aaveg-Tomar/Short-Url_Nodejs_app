const shortid = require('shortid');
const URL = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    // Normalize the URL by trimming and converting to lowercase
    const normalizedURL = body.url.trim().toLowerCase();

    // Check if the URL already exists in the database
    const urlExists = await URL.findOne({ redirectURL: normalizedURL });
    

    if(urlExists){
        
        return  res.render('home' , {
            id : urlExists.shortId
        })
    }

    const shortID = shortid.generate();  // Ensure this is the correct method

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });

    // send data ont he frontend 
    return res.render('home' , {
        id : shortID
    })

    // return res.json({ id: shortID }); this data send in json format
}

const handleGetNewShortURL = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),

                }
            }
        }
    )
    return res.redirect(entry.redirectURL);
}


const  handleAnalyticsURL = async(req , res) =>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    return res.json({totalclick : result.visitHistory.length , analytics : result.visitHistory});
}



module.exports = {
    handleGenerateNewShortURL,
    handleGetNewShortURL,
    handleAnalyticsURL,
}
