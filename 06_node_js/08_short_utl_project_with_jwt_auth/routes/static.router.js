const express = require('express')
const URL = require('../models/url.model')
const { restrictTo } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res)=>{
    const allUrls = await URL.find({createdBy: req.user._id})
    return res.render('home', {
        urls: allUrls
    })
})

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    const allUrls = await URL.find({})
    return res.render('home', {
        urls: allUrls
    })
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})
router.get('/login', (req, res) => {
    return res.render('login')
})

module.exports = router