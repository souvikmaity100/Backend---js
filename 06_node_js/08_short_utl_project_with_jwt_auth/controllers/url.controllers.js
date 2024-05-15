const shortid = require('shortid');
const URL = require('../models/url.model')

async function generateNewShortURL(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const shortId = shortid()
    await URL.create({
        shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    const allUrls = await URL.find({})
    return res.redirect('/')
    // return res.status(200).json({ id: shortId })
}

async function visitGeneratedURL(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    return res.redirect(entry.redirectURL)
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    console.log(shortId);
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })

}


module.exports = { generateNewShortURL, visitGeneratedURL, getAnalytics }