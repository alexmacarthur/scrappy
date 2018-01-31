const glob = require('glob');
const express = require('express');
const app = express();
const copy = require('./data/copy.js').copy;
const port = 3000;

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

app.listen(port, () => {
  console.log('\x1b[32m%s\x1b[32m', `Open https://localhost:${port}.`);
  console.log('\x1b[0m%s\x1b[0m', 'To close, press CONTROL + C.\n');
});
