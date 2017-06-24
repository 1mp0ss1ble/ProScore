import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import webpackConfig from './webpack.config.dev';
import routes from './server/routes';
import config from './server/config';


mongoose.connect(config.mongo.url, config.mongo.otpions);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// import mongoose from 'mongoose';
const app = express();

const port = process.env.PORT || config.defaultPort;

const bodyParser = require('body-parser');

const favicon = require('serve-favicon');

// app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'))
app.use(express.static('public'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/api', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => console.log('Server running on port ', port));
