const express = require('express');
const router = express.Router();

const { userRouter } = require('./users');
const { movieRouter } = require('./movies');

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;