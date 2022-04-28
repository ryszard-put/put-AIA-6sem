const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const models = require('./models');
const mongoURL = 'mongodb://127.0.0.1/shop';
const PORT = 3000;

async function main() {
  try {
    mongoose.connect(mongoURL);
  } catch (e) {
    throw new Error('Mongo connection error');
  }

  const connection = mongoose.connection;

  connection.on('error', (err) => console.log(err));

  const app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(
    session({
      secret: '2137XDDDDD2137',
      saveUninitialized: true,
      resave: false,
      name: 's_id',
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },
    })
  );

  app.get('/', (_, res) => res.render('index'));

  app.listen(PORT, () => console.log(`Server started localhost:${PORT}`));
}

main().catch((err) => console.log(err));
