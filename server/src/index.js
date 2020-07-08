require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const middlewares = require('./middlewares');

const app = express();

// DB Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('🗃 Connected to DB...'))
  .catch((error) => console.log(error));

// Middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

// 404
app.use(middlewares.notFound);

// Error Handler
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`🚀 Listening at http://localhost:${port}`);
});
