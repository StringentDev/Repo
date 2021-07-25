var express = require('express') 
var router = express.Router() 

// define the home page route 
router.get('/', async function (req, res) { 
	res.render('pages/index.html', {page: req.url})
}) 

// define the documentation route 
router.get('/documentation', async function (req, res) { 
	res.render('pages/documentation.html', {page: req.url}) 
}) 

router.get('/app/:page', async function (req, res) { 
	res.render('pages/app'+req.params.page, {page: req.url}) 
}) 


module.exports = router