const express = require('express');
const { patchUserValidator } = require('../middlewares/validation');

const userRouter = express.Router();
const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', patchUserValidator, patchUser);

module.exports = {
  userRouter,
};
