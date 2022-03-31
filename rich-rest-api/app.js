/** @format */
const cards = require('./routes/cards');
const auth = require('./routes/auth');
const users = require('./routes/users');
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1/rich-rest-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Success: You are now connected to MongoDB'))
  .catch(err => console.log('Failure: Could not connected to MongoDB' + err));

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards);

const port = process.env.PORT || 3000;

http.listen(port, () =>
  console.log(`Listening to port ${port}, click http://localhost:3000:${port}`)
);
