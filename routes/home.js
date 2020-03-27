const express = require('express');
const db = require('../database/dbconfig.js');
const router = express.Router();

router.get('/', (req, res) => {
	if (req.session.email) {
		res.render('home-page', { sess: req.session });
	} else {
		res.redirect('/login?err=not-logged-in');
	}
});

module.exports = router;
