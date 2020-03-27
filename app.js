// require modules
const express = require('express');
const session = require('express-session');
const app = express();

// trust first proxy
app.set('trust proxy', 1);

// setup session information
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true
	})
);

// setup view engine
app.set('view engine', 'ejs');

// setup encoding
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup routes
app.use('/', require('./routes/home.js'));
app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));
app.use('/logout', require('./routes/logout.js'));

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Now listening on port ' + PORT);
});
