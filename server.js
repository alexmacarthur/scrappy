const spdy = require('spdy');
const glob = require('glob');
const express = require('express');
const app = express();
const copy = require('./data/copy.js').copy;
const path = require('path');
const fs = require('fs');
const port = 3000;

const options = {
  key: fs.readFileSync(`${__dirname}/ssl/server.key`),
  cert: fs.readFileSync(`${__dirname}/ssl/server.crt`)
};

app.set('view engine', 'pug');
app.set('views', './scenarios');

app.use(express.static(`${__dirname}/`));
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

//-- Create routes based on what's in the /scenarios directory.
const scenarioDirectory = `${__dirname}/scenarios/`;
const scenarios = glob.sync(scenarioDirectory + '/**/*').map((item) => {
  return item.replace(scenarioDirectory, '').replace('.pug', '');
});

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Look in your /scenarios directory for available routes.')
});

scenarios.forEach(route => {
  app.get(`/${route}/`, (req, res) => {
    res.render(route, { title: 'Page Title', copy });
  });
});

spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log('\x1b[32m%s\x1b[32m', `Open https://localhost:${port}.`);
      console.log('\x1b[0m%s\x1b[0m', 'To close, press CONTROL + C.\n');
    }
  });

