const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { authRouter } = require('./auth');
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');

router.use(authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.all('*', (req, res, next) => {
  next(new ErrorNotFound('Указанный маршрут не существует'));
});

module.exports = router;