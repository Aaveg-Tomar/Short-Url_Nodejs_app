const express = require('express');

const { handleGenerateNewShortURL,
    handleGetNewShortURL,
    handleAnalyticsURL } = require("../controllers/url")

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get('/:shortId', handleGetNewShortURL);

router.get('/analytics/:shortId', handleAnalyticsURL);

module.exports = router;