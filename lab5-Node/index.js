const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const { Item, Order } = require('./models');
const populate = require('./utils/populate');
const res = require('express/lib/response');

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

  await populate();

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

  app.use((req, res, next) => {
    if (!req.session)
      res.status(500).send({ error: 'Session not established' });
    if (!req.session.cart) req.session.cart = { items: [] };

    // console.log(req.session);
    console.log(req.sessionID);
    next();
  });

  app.get('/', async (_, res) => {
    const items = await Item.find({});
    res.render('index', { items });
  });

  app.get('/add-to-cart', (req, res) => {
    console.log(req.query);
    if (req.query.id) {
      if (!req.session.cart.items.includes(req.query.id)) {
        req.session.cart.items.push(req.query.id);
      }
    } else {
      console.log('no id');
    }
    res.redirect('/');
  });

  app.get('/cart', async (req, res) => {
    const { items } = req.session.cart;
    console.log(items);
    const cart = await Item.find({
      _id: { $in: items.map((id) => mongoose.Types.ObjectId(id)) },
    });
    console.log(cart);
    res.render('cart', { cart });
  });

  app.listen(PORT, () => console.log(`Server started localhost:${PORT}`));
}

main().catch((err) => console.log(err));
