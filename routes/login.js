const express = require('express');
const db = require('../database/dbconfig.js');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/', (req, res) => {
	if (req.session.email) {
		res.redirect('/');
	} else {
		res.render('login-page', { query: req.query });
	}
});

router.post('/', (req, res) => {
	if (req.body.email && req.body.password) {
		let user = db.users.find({ email: req.body.email });
		if (user.length) {
			bcrypt.compare(req.body.password, user[0].password).then(function(result) {
				if (result) {
					req.session.email = user[0].email;
					req.session.name = user[0].name;
					res.redirect('/');
				} else {
					res.redirect('/login?err=invalid-details');
				}
			});
		} else {
			res.redirect('/login?err=invalid-details');
		}
	} else {
		res.redirect('/login?err=missing-fields');
	}
});

module.exports = router;
