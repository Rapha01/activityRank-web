const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes.js');
const fct = require('./util/fct.js');
const cron = require('node-cron');
const scheduler = require('./cron/scheduler.js');
process.env.UV_THREADPOOL_SIZE = 80;
process.env.PORT = 3006;

// View Engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

// Basic Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public/')));
//app.use('/gentelella', express.static('node_modules/gentelella/'));

// Set Routes
app.use(routes);


const server = app.listen(process.env.PORT, async () => {
  try {
    await scheduler.start();

    console.log(`Listening on port ${process.env.PORT}...`);
  } catch (e) {
    console.log(e);
    await fct.waitAndReboot(3000);
  }
});
