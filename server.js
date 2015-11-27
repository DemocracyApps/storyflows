var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var express = require('express');
var app = new express();
var port = 3001;
console.log("Environment is " + JSON.stringify(process.env.NODE_ENV));

app.use(express.static('stuff'));
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
  console.log("Got a root request");
  res.sendFile(__dirname + '/index.html');
});

app.get("/api/v1/datasets/*", function (req, res) {
  console.log("Got an API request.");
  res.sendFile(__dirname + '/examples/testdata.json');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
