const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	req.session.destroy((err) => {
		res.redirect('/login');
	});
});

module.exports = router;
