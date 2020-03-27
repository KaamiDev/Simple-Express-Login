const express = require('express');
const db = require('../database/dbconfig.js');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/', (req, res) => {
	if (req.session.email) {
		res.redirect('/');
	} else {
		res.render('register-page', { query: req.query });
	}
});

router.post('/', (req, res) => {
	if (req.body.name && req.body.email && req.body.password && req.body.confpassword) {
		if (req.body.password === req.body.confpassword) {
			if (!db.users.find({ email: req.body.email }).length) {
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					let user = {
						name: req.body.name,
						email: req.body.email,
						password: hash
					};
					db.users.save(user);
					res.redirect('/login?success=account-created');
				});
			} else {
				res.redirect('/register?err=user-exists');
			}
		} else {
			res.redirect('/register?err=invalid-conf-pass');
		}
	} else {
		res.redirect('/register?err=missing-fields');
	}
});

module.exports = router;
