const express = require('express');
const router = express.Router();

const { authRouter } = require('./auth');
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');

router.use(authRouter);
//app.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;