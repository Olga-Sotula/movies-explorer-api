require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes/index');
const { errorHandler } = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const { NODE_ENV, PORT, MONGO_URL } = process.env;
const { PORT_DEV, MONGO_URL_DEV } = require('./utils/constants');

const port = NODE_ENV === 'PRODUCTION' ? PORT : PORT_DEV;
const mongoUrl = NODE_ENV === 'PRODUCTION' ? MONGO_URL : MONGO_URL_DEV;
const app = express();
app.use(helmet());
app.use(cors());

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);

app.get('/crash-test', () => { // crash-test
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
