const config = require('./config.js');
const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

const rateLimit = require("express-rate-limit");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static("node_modules"));
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(301, `https://${req.headers.host}/${req.url}`)
  }

  next();
});

app.enable("trust proxy");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
app.use(limiter);

app.get('/', (req, res) => {
	res.render('index', res.locals.creds);
})

for(const page of config.pages) {
	app.get(`/${page}`, (req, res) => {
		res.render(`${page}.html`, res.locals.creds);
	  console.log(`[CLIENT]${page}`)
	})
}

app.use((req, res, next) =>  {
	res.status(404).render('error/404.html')
});

const port = process.env.PORT || config.port;
app.listen(port, () => {
  	console.log('Express server listening on port', port)
});

 